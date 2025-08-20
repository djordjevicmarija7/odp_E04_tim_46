import { useEffect, useState } from "react";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";
import { buildImageUrl } from "../../helpers/BuildImageUrl";

interface Props {
  reportsApi: IReportsAPIService;
  reportId: number;
}

export function FinishReportForm({ reportsApi, reportId }: Props) {
  const [komentar, setKomentar] = useState("");
  const [cena, setCena] = useState<number | "">("");
  const [ishod, setIshod] = useState(true);
  const [reportImage, setReportImage] = useState<string | null>(null);

  useEffect(() => {
    reportsApi.getPrijavaById(reportId).then((res) => {
      if (res.success && res.data) {
        setReportImage(buildImageUrl(res.data.imagePath));
      }
    });
  }, [reportId, reportsApi]);

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
      {reportImage && (
        <div>
          <label className="text-sm font-medium text-gray-700">Слика пријаве</label>
          <img src={reportImage} alt="report" className="w-72 h-48 object-cover rounded-md border mb-3" />
        </div>
      )}

      <textarea value={komentar} onChange={e => setKomentar(e.target.value)} placeholder="Komentar majstora" className="textarea-field" />
      <input type="number" value={cena} onChange={e => setCena(e.target.value === "" ? "" : Number(e.target.value))} placeholder="Cena (дин)" className="input-field" />
      <select value={ishod ? "saniran" : "nerez"} onChange={e => setIshod(e.target.value === "saniran")} className="input-field">
        <option value="saniran">Saniran</option>
        <option value="nerez">Problem nije rešen</option>
      </select>
      <button type="submit" className="btn-primary w-fit">💾 Sačuvaj</button>
    </form>
  );
}
