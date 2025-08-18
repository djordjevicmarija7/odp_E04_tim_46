import { useState } from "react";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";

interface Props {
  reportsApi: IReportsAPIService;
}

export function PrijaviKvarForma({ reportsApi }: Props) {
  const [naslov, setNaslov] = useState("");
  const [opis, setOpis] = useState("");
  const [adresa, setAdresa] = useState("");
  const [greska, setGreska] = useState("");

  const podnesiFormu = async (e: React.FormEvent) => {
    e.preventDefault();
    const resp = await reportsApi.kreirajPrijavu({ naslov, opis, adresa });
    if (!resp.success) {
      setGreska(resp.message ?? "");
    } else {
      setNaslov(""); setOpis(""); setAdresa(""); setGreska("");
    }
  };

  return (
    <form onSubmit={podnesiFormu} className="grid gap-4">
      <input
        value={naslov}
        onChange={(e) => setNaslov(e.target.value)}
        placeholder="Наслов пријаве"
        className="input-field"
      />
      <textarea
        value={opis}
        onChange={(e) => setOpis(e.target.value)}
        placeholder="Детаљан опис квара..."
        className="textarea-field h-28"
      />
      <input
        value={adresa}
        onChange={(e) => setAdresa(e.target.value)}
        placeholder="Адреса"
        className="input-field"
      />
      {greska && <p className="text-red-600 font-medium">{greska}</p>}
      <button type="submit" className="btn-primary w-fit">📤 Пошаљи</button>
    </form>
  );
}

