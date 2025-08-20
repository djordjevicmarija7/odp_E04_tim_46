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

  const filtered = reports.filter((r) =>
    r.opis.toLowerCase().includes(search.toLowerCase()) ||
    r.naslov.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="page-wrapper">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">📋 Sve prijave</h1>
      <FilterBar onSearch={(q) => setSearch(q)} />
      <ReportList reports={filtered} />
    </main>
  );
}
