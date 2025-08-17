import { useEffect, useState } from "react";
import { ReportList } from "../../components/reports/ReportList";
import { FilterBar } from "../../components/reports/FilterBar";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";
import type { ReportDto } from "../../models/reports/ReportDto";

interface Props {
  reportsApi: IReportsAPIService;
}

export default function SvePrijavePage({ reportsApi }: Props) {
  const [reports, setReports] = useState<ReportDto[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    reportsApi.getSviIzvestaji().then((res) => {
      if (res.success && res.data) setReports(res.data);
    });
  }, [reportsApi]);

  return (
    <main className="page-wrapper">
      <h1>Sve prijave</h1>
      <FilterBar onSearch={(query) => setSearch(query)} />
      <ReportList
        reports={reports.filter((r) =>
          r.opis.toLowerCase().includes(search.toLowerCase())
        )}
      />
    </main>
  );
}