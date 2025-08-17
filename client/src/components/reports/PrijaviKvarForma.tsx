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
    <form onSubmit={podnesiFormu}>
      <input value={naslov} onChange={e => setNaslov(e.target.value)} placeholder="Naslov" />
      <textarea value={opis} onChange={e => setOpis(e.target.value)} placeholder="Opis" />
      <input value={adresa} onChange={e => setAdresa(e.target.value)} placeholder="Adresa" />
      {greska && <p>{greska}</p>}
      <button type="submit">Pošalji</button>
    </form>
  );
}
