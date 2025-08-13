import { Request, Response, Router } from "express";
import { IReportService } from "../../Domain/services/reports/IReportService";
import { ReportDto } from "../../Domain/DTOs/reports/ReportDto";
import { authenticate } from "../../Middlewares/authentification/AuthMiddleware";
import { authorize } from "../../Middlewares/authorization/AuthorizeMiddleware";

export class ReportController {
  private router: Router;
  private reportService: IReportService;

  constructor(reportService: IReportService) {
    this.router = Router();
    this.reportService = reportService;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // ostale metode, npr. /api/v1/user/1 <--- user po ID-ju 1
    this.router.get("/reports", authenticate, authorize("Majstor"), this.kvarovi.bind(this));
  }

  
  private async kvarovi(req: Request, res: Response): Promise<void> {
    try {
      const kvaroviPodaci: ReportDto[] =
        await this.reportService.getSviKvarovi();

      res.status(200).json(kvaroviPodaci);
      return;
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  }
  public getRouter(): Router {
    return this.router;
  }
}
