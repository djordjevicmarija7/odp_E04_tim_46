import { Report } from "../../models/Report";

export interface IReportRepository {
  create(report: Report): Promise<Report>;
  getById(id: number): Promise<Report>;
  getAll(): Promise<Report[]>;
  update(report: Report): Promise<Report>;
  delete(id: number): Promise<boolean>;
  exists(id: number): Promise<boolean>;
}