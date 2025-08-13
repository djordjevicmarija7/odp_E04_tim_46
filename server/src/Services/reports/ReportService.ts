import { ReportDto } from "../../Domain/DTOs/reports/ReportDto";
import { Report } from "../../Domain/models/Report";
import { IReportRepository } from "../../Domain/repositories/reports/IReportRepository";
import { IReportService } from "../../Domain/services/reports/IReportService";

export class ReportService implements IReportService {
  public constructor(private reportRepository: IReportRepository) {}

  async getSviKvarovi(): Promise<ReportDto[]> {
    const kvarovi: Report[] = await this.reportRepository.getAll();
    const korisniciDto: ReportDto[] = kvarovi.map(
      (report) => new ReportDto(report.id, report.naslov, report.opis, report.imagePath, report.adresa, report.status,report.createdAt, report.price, report.masterComment)
    );

    return korisniciDto;
  }
}
