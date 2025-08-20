import { ReportDto } from "../../DTOs/reports/ReportDto";
import {Reaction} from "../../models/Reaction"

export interface IReportService {
  getSviIzvestaji(
    status?: string | null,
    sortBy?: "createdAt" | "cena",
    order?: "ASC" | "DESC"
  ): Promise<ReportDto[]>;

  getPrijaveKorisnika(
    userId: number,
    status?: string | null,
    sortBy?: "createdAt" | "cena",
    order?: "ASC" | "DESC"
  ): Promise<ReportDto[]>;

  kreirajPrijavu(data: {
    userId: number;
    naslov?: string | null;
    opis: string;
    imagePath?: string | null;
    adresa: string;
  }): Promise<ReportDto>;

  prihvatiPrijavu(
    reportId: number,
    masterId: number
  ): Promise<boolean>;

  zavrsiPrijavu(
    reportId: number,
    masterId: number,
    saniran: boolean,
    comment?: string,
    cena?: number
  ): Promise<boolean>;
getReactionForUser(reportId: number, userId: number): Promise<Reaction | null>;
getReactionsForUserForReports(reportIds: number[], userId: number): Promise<Reaction[]>;
  dodajReakciju(
    reportId: number,
    userId: number,
    reakcija: "like" | "dislike" | "neutral"
  ): Promise<Reaction>;
}