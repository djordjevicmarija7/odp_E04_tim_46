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
      {/* Naslov */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        📋 Sve prijave
      </h1>

      {/* Search bar */}
      <div className="mb-6">
        <FilterBar onSearch={(query) => setSearch(query)} />
      </div>

      {/* Lista prijava */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportList
          reports={reports.filter((r) =>
            r.opis.toLowerCase().includes(search.toLowerCase())
          )}
        />
      </div>
    </main>
  );
}
