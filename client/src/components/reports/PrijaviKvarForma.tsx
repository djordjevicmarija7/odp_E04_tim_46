import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IReportsAPIService } from "../../api_services/reports/IReportAPIService";
import { validacijaPrijaveKvaraClient } from "../../api_services/validators/reports/reportValidator";
import { Send } from "lucide-react";

interface Props {
  reportsApi: IReportsAPIService;
}

export function PrijaviKvarForma({ reportsApi }: Props) {
  const navigate = useNavigate();

  const [naslov, setNaslov] = useState("");
  const [opis, setOpis] = useState("");
  const [adresa, setAdresa] = useState("");
  const [greska, setGreska] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
    else setPreview(null);
  }

  const podnesiFormu = async (e: React.FormEvent) => {
    e.preventDefault();
    setGreska("");

    const valid = validacijaPrijaveKvaraClient(naslov, opis, adresa);
    if (!valid.uspesno) {
      setGreska(valid.poruka ?? "Neispravni podaci");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append("naslov", naslov);
      form.append("opis", opis);
      form.append("adresa", adresa);
      if (file) form.append("image", file);

      const resp = await reportsApi.kreirajPrijavu(form);
      if (!resp.success) {
        setGreska(resp.message ?? "Greška pri kreiranju prijave");
      } else {
        setNaslov("");
        setOpis("");
        setAdresa("");
        setFile(null);
        if (preview) {
          URL.revokeObjectURL(preview);
          setPreview(null);
        }
        setGreska("");
      }
    } catch (err: any) {
      setGreska(err?.message ?? "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Nova prijava kvara</h2>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 bg-white/60 hover:bg-white/80 text-gray-800 px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm transition"
        >
          ← Nazad
        </button>
      </div>

      <form onSubmit={podnesiFormu} className="grid gap-4">
        <input
          value={naslov}
          onChange={(e) => setNaslov(e.target.value)}
          placeholder="Naslov prijave"
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
          placeholder="Detaljan opis kvara..."
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 h-28"
        />
        <input
          value={adresa}
          onChange={(e) => setAdresa(e.target.value)}
          placeholder="Adresa"
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div>
          <label className="text-sm font-medium text-gray-700">Dodaj sliku (opciono)</label>
          <input type="file" accept="image/*" onChange={onFileChange} className="mt-2" />
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="preview"
                className="w-48 h-32 object-cover rounded-xl border"
              />
            </div>
          )}
        </div>

        {greska && <p className="text-red-700/80 font-medium">{greska}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className=" btn-primary flex items-center justify-center gap-2px-5 py-2 rounded-xl bg-gradient-to-r from-[#D9BFA0] to-[#C77D57] text-white font-semibold shadow hover:brightness-105 transition disabled:opacity-70"
            disabled={loading}
          >
  <Send size={18} className="mr-2" />

            {loading ? "Slanje..." : " Pošalji"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/60 hover:bg-white/80 text-gray-800 border border-gray-200 shadow-sm transition"
>
          
            Otkaži
          </button>
        </div>
      </form>
    </div>
  );
}

export default PrijaviKvarForma;
