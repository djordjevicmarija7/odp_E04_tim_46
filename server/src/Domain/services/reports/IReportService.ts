import { ReportDto } from "../../DTOs/reports/ReportDto";

export interface IReportService {
  getSviKvarovi(): Promise<ReportDto[]>;
}