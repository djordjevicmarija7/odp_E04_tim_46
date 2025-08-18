// src/WebAPI/controllers/ReportController.ts
import { Request, Response, Router } from "express";
import fs from "fs";
import { authenticate } from "../../Middlewares/authentification/AuthMiddleware";
import { authorize } from "../../Middlewares/authorization/AuthorizeMiddleware";
import { ReportService } from "../../Services/reports/ReportService";
import { ReportRepository } from "../../Database/repositories/ReportRepository";
import { validacijaPrijaveKvara } from "../validators/ReportValidator";
import { IReportService } from "../../Domain/services/reports/IReportService";

// --- Folder za slike (jednostavna verzija) ---
const REPORTS_DIR = "uploads/reports";
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

const repo = new ReportRepository();
const service = new ReportService(repo);

export class ReportController {
  private router: Router;
  private service: IReportService;

  constructor(service: IReportService) {
    this.router = Router();
    this.service=service;
    this.initializeRoutes();
  }

 private initializeRoutes(): void {
  this.router.post("/reports", authenticate, this.kreirajPrijavu.bind(this));
  this.router.get("/reports", authenticate, this.prijaveKorisnika.bind(this));

  // PRAVILAN REDOSLED: specificne pre parametar ruta
  this.router.get("/reports/all", authenticate, authorize("majstor"), this.svePrijave.bind(this));
  this.router.get("/reports/:id", authenticate, this.detaljiPrijave.bind(this));

  this.router.put("/reports/:id/accept", authenticate, authorize("majstor"), this.prihvatiPrijavu.bind(this));
  this.router.put("/reports/:id/finish", authenticate, authorize("majstor"), this.zavrsiPrijavu.bind(this));
  this.router.post("/reports/:id/reaction", authenticate, this.dodajReakciju.bind(this));
}


  private async kreirajPrijavu(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;
      const { naslov, opis, adresa, slikaBase64 } = req.body;

      const valid = validacijaPrijaveKvara(naslov, opis, adresa);
      if (!valid.uspesno) {
        res.status(400).json({ success: false, message: valid.poruka });
        return;
      }

      let imagePath: string | null = null;

      if (slikaBase64 && typeof slikaBase64 === "string") {
        try {
          const base64Data = slikaBase64.split(",")[1];
          const ext = slikaBase64.includes("png") ? ".png" : ".jpg";
          const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
          const savePath = `${REPORTS_DIR}/${fileName}`;

          fs.writeFileSync(savePath, base64Data, "base64");
          imagePath = `/uploads/reports/${fileName}`;
        } catch {
          res.status(400).json({ success: false, message: "Greška pri snimanju slike." });
          return;
        }
      }

      const created = await service.kreirajPrijavu({
        userId: user.id,
        naslov,
        opis,
        imagePath,
        adresa,
      });

      res.status(201).json({ success: true, data: created });
    } catch (error: any) {
      console.error("Error in kreirajPrijavu:", error);
      res.status(400).json({ success: false, message: error.message || "Greška pri kreiranju prijave." });
    }
  }

  private async prijaveKorisnika(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;
      const { status, sortBy, order } = req.query as any;

      const reports = await service.getPrijaveKorisnika(
        user.id,
        status ?? null,
        (sortBy as "createdAt" | "cena") ?? undefined,
        order === "ASC" ? "ASC" : "DESC"
      );

      res.status(200).json({ success: true, data: reports });
    } catch (error: any) {
      console.error("Error in prijaveKorisnika:", error);
      res.status(500).json({ success: false, message: error.message || "Greška pri dohvatanju prijava." });
    }
  }

  private async detaljiPrijave(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id) || id <= 0) {
        res.status(400).json({ success: false, message: "Neispravan ID." });
        return;
      }

      const report = await repo.getById(id);
      if (report.id === 0) {
        res.status(404).json({ success: false, message: "Prijava nije pronađena." });
        return;
      }

      res.status(200).json({ success: true, data: report });
    } catch (error: any) {
      console.error("Error in detaljiPrijave:", error);
      res.status(500).json({ success: false, message: error.message || "Greška pri dohvatanju detalja." });
    }
  }

  private async svePrijave(req: Request, res: Response): Promise<void> {
    try {
      const { status, sortBy, order } = req.query as any;

      const reports = await service.getSviIzvestaji(
        status ?? null,
        (sortBy as "createdAt" | "cena") ?? undefined,
        order === "ASC" ? "ASC" : "DESC"
      );

      res.status(200).json({ success: true, data: reports });
    } catch (error: any) {
      console.error("Error in svePrijave:", error);
      res.status(500).json({ success: false, message: error.message || "Greška pri dohvatanju svih prijava." });
    }
  }

  private async prihvatiPrijavu(req: Request, res: Response): Promise<void> {
    try {
      const master = (req as any).user;
      const id = Number(req.params.id);
      if (isNaN(id) || id <= 0) {
        res.status(400).json({ success: false, message: "Neispravan ID." });
        return;
      }

      const ok = await service.prihvatiPrijavu(id, master.id);
      if (!ok) {
        res.status(400).json({ success: false, message: "Prihvatanje prijave nije uspelo." });
        return;
      }

      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("Error in prihvatiPrijavu:", error);
      res.status(500).json({ success: false, message: error.message || "Greška pri prihvatanju prijave." });
    }
  }

  private async zavrsiPrijavu(req: Request, res: Response): Promise<void> {
    try {
      const master = (req as any).user;
      const id = Number(req.params.id);
      if (isNaN(id) || id <= 0) {
        res.status(400).json({ success: false, message: "Neispravan ID." });
        return;
      }

      const { saniran, comment, cena } = req.body;
      const ok = await service.zavrsiPrijavu(id, master.id, Boolean(saniran), comment, cena ? Number(cena) : undefined);

      if (!ok) {
        res.status(400).json({ success: false, message: "Završavanje prijave nije uspelo." });
        return;
      }

      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("Error in zavrsiPrijavu:", error);
      res.status(500).json({ success: false, message: error.message || "Greška pri završavanju prijave." });
    }
  }

  private async dodajReakciju(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;
      const id = Number(req.params.id);
      if (isNaN(id) || id <= 0) {
        res.status(400).json({ success: false, message: "Neispravan ID." });
        return;
      }

      const { tip } = req.body;
      if (!tip || !["like", "dislike", "neutral"].includes(tip)) {
        res.status(400).json({ success: false, message: "Nepoznat tip reakcije." });
        return;
      }

      const reaction = await service.dodajReakciju(id, user.id, tip);
      res.status(201).json({ success: true, data: reaction });
    } catch (error: any) {
      console.error("Error in dodajReakciju:", error);
      res.status(500).json({ success: false, message: error.message || "Greška pri dodavanju reakcije." });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
