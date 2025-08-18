import { useState } from "react";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";

interface Props {
  reportsApi: IReportsAPIService;
  reportId: number;
}

export function FinishReportForm({ reportsApi, reportId }: Props) {
  const [komentar, setKomentar] = useState("");
  const [cena, setCena] = useState<number | "">("");
  const [ishod, setIshod] = useState(true); // true = saniran

  const zavrsi = async (e: React.FormEvent) => {
    e.preventDefault();
    await reportsApi.zavrsiPrijavu(reportId, {
      saniran: ishod,
      comment: komentar,
      cena: cena === "" ? undefined : Number(cena),
    });
  };

return (
    <form onSubmit={zavrsi} className="grid gap-4">
      <textarea
        value={komentar}
        onChange={(e) => setKomentar(e.target.value)}
        placeholder="Коментар мајстора"
        className="textarea-field h-28"
      />
      <input
        type="number"
        value={cena}
        onChange={(e) => setCena(e.target.value === "" ? "" : Number(e.target.value))}
        placeholder="Цена поправке (дин)"
        className="input-field"
      />
      <select
        value={ishod ? "saniran" : "nerez"}
        onChange={(e) => setIshod(e.target.value === "saniran")}
        className="input-field"
      >
        <option value="saniran">✅ Saniran</option>
        <option value="nerez">❌ Problem није решен</option>
      </select>
      <button type="submit" className="btn-primary w-fit">💾 Сачувај</button>
    </form>
  );
}
