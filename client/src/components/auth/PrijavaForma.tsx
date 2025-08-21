import { useState } from "react";
import { Link } from "react-router-dom";
import { validacijaPodatakaAuth } from "../../api_services/validators/auth/AuthValidator";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { useAuth } from "../../hooks/auth/useAuthHook";

export function PrijavaForma({ authApi }: AuthFormProps) {
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [greska, setGreska] = useState("");
  const { login } = useAuth();

  const podnesiFormu = async (e: React.FormEvent) => {
    e.preventDefault();

    const validacija = validacijaPodatakaAuth(korisnickoIme, lozinka);
    if (!validacija.uspesno) {
      setGreska(validacija.poruka ?? "Neispravni podaci");
      return;
    }

    const odgovor = await authApi.prijava(korisnickoIme, lozinka);
    if (odgovor.success && odgovor.data) {
      login(odgovor.data);
    } else {
      setGreska(odgovor.message);
      setKorisnickoIme("");
      setLozinka("");
    }
  };

  return (
    <div className="bg-white/30 backdrop-blur-lg shadow-md rounded-2xl p-10 w-full max-w-md border border-blue-400">
      {/* Naslov */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Prijava
      </h1>

      {/* Akademski opis */}
      <p className="text-center text-gray-600 mb-6 max-w-md mx-auto">
        Da biste koristili sistem za evidenciju i upravljanje prijavama i kvarovima, molimo prijavite se.
      </p>

      <form onSubmit={podnesiFormu} className="space-y-4">
        <input
          type="text"
          placeholder="Korisničko ime"
          value={korisnickoIme}
          onChange={(e) => setKorisnickoIme(e.target.value)}
          className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={lozinka}
          onChange={(e) => setLozinka(e.target.value)}
          className="w-full bg-white/40 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {greska && <p className="text-md text-center text-red-700/80 font-medium">{greska}</p>}
        <button
          type="submit"
          className="w-full bg-black-700/70 hover:bg-blue-700/90 text-white py-2 rounded-xl transition"
        >
          Prijavi se
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Nemate nalog?{" "}
        <Link to="/register" className="text-grey-900 hover:underline font-medium">
          Registrujte se
        </Link>
      </p>
    </div>
  );
}
