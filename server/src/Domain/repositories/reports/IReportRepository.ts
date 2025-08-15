import { Report } from "../../models/Report";
import {Reaction} from "../../models/Reaction"

export interface IReportRepository {
create(report: Report): Promise<Report>;

  getById(id: number): Promise<Report>;

  getByUser(
    userId: number,
    status?: string | null,
    sortBy?: "createdAt" | "cena",
    order?: "ASC" | "DESC"
  ): Promise<Report[]>;

  getAll(
    status?: string | null,
    sortBy?: "createdAt" | "cena",
    order?: "ASC" | "DESC"
  ): Promise<Report[]>;

  update(report: Report): Promise<Report>;

  delete(id: number): Promise<boolean>;

  exists(id: number): Promise<boolean>;

  addReaction(reaction: Reaction): Promise<Reaction>;
}