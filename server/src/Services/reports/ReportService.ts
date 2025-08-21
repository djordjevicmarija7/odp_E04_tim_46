import { Report } from "../../Domain/models/Report";
import { Reaction } from "../../Domain/models/Reaction";
import { ReportRepository } from "../../Database/repositories/ReportRepository";
import { ReportDto } from "../../Domain/DTOs/reports/ReportDto";
import { IReportService } from "../../Domain/services/reports/IReportService";
import { validacijaPrijaveKvara } from "../../WebApi/validators/ReportValidator";
import { IReportRepository } from "../../Domain/repositories/reports/IReportRepository";
import { ReactionRepository } from "../../Database/repositories/ReactionRepository";
import { IReactionRepository } from "../../Domain/repositories/reactions/IReactonRepository";

export class ReportService implements IReportService {
  private reactionRepo: ReactionRepository;
  constructor(private repo: IReportRepository) {
    this.reactionRepo = new ReactionRepository();
  }

  async getSviIzvestaji(status?: string | null, sortBy?: 'createdAt' | 'cena', order: 'ASC'|'DESC' = 'DESC'): Promise<ReportDto[]> {
    const reports: ReportDto[] = await this.repo.getAll(status, sortBy, order);
    return reports.map(r => new ReportDto(
      r.id, r.naslov, r.opis, r.imagePath, r.adresa, r.createdAt, r.status, r.cena, r.masterComment
    ));
  }

  async getPrijaveKorisnika(userId: number, status?: string | null, sortBy?: 'createdAt'|'cena', order: 'ASC'|'DESC' = 'DESC'): Promise<ReportDto[]> {
    const reports = await this.repo.getByUser(userId, status, sortBy, order);
    return reports.map(r => new ReportDto(
      r.id, r.naslov, r.opis, r.imagePath, r.adresa, r.createdAt, r.status, r.cena, r.masterComment,
    ));
  }

  async kreirajPrijavu(data: { userId:number; naslov?:string|null; opis:string; imagePath?:string|null; adresa:string }): Promise<ReportDto> {
  const rezultat = validacijaPrijaveKvara(
    data.naslov ?? undefined,
    data.opis,
    data.adresa
  );

  if (!rezultat.uspesno) {
    throw new Error(rezultat.poruka || "Validacija nije prošla.");
  }

  const r = new Report(
    0,
    data.userId,
    data.naslov ?? "",
    data.opis,
    data.imagePath ?? null,
    data.adresa
  );

  return await this.repo.create(r);
  }

  async prihvatiPrijavu(reportId: number, masterId: number): Promise<boolean> {
    const exists = await this.repo.exists(reportId);
    if (!exists) throw new Error("Prijava nije pronađena.");
    const report = await this.repo.getById(reportId);
    report.status = "Popravka u toku";
    report.masterId = masterId;
    const updated = await this.repo.update(report);
    return updated.id !== 0;
  }

  async zavrsiPrijavu(reportId: number, masterId: number, saniran: boolean, comment?: string, cena?: number): Promise<boolean> {
    const exists = await this.repo.exists(reportId);
    if (!exists) throw new Error("Prijava nije pronađena.");

    const report = await this.repo.getById(reportId);
    report.masterId = masterId;
    report.masterComment = comment ?? null;
    report.cena = cena ?? null;
    report.status = saniran ? "Saniran" : "Problem nije rešen";

    const updated = await this.repo.update(report);
    return updated.id !== 0;
  }
  async getReactionForUser(reportId: number, userId: number): Promise<Reaction | null> {
    return await this.reactionRepo.getByReportAndUser(reportId, userId);
  }

 
  async getReactionsForUserForReports(reportIds: number[], userId: number): Promise<Reaction[]> {
    return await this.reactionRepo.getByReportIdsAndUser(reportIds, userId);
  }

  async dodajReakciju(reportId: number, userId: number, reakcija: 'like'|'dislike'|'neutral'): Promise<Reaction> {
 const report = await this.repo.getById(reportId);
  if (!report || report.id === 0) {
    throw new Error("Prijava nije pronađena.");
  }

  const reaction: Reaction = {
    id: 0, 
    reportId,
    userId,
    reakcija: reakcija,
    createdAt: new Date().toISOString()
  };

  return await this.repo.addReaction(reaction);
  }
}