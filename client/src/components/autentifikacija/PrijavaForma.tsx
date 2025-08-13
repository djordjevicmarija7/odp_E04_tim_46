import { useState } from "react";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";
import { validacijaPodatakaAuth } from "../../api_services/validators/auth/AuthValidator";
import { SačuvajVrednostPoKljuču } from "../../helpers/local_storage";

export function PrijavaForma({ authApi, onLoginSuccess }: AuthFormProps) {
  const [korisnickoIme, setKorisnickoIme] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [greska, setGreska] = useState("");

  const podnesiFormu = async (e: React.FormEvent) => {
    e.preventDefault();

    const validacija = validacijaPodatakaAuth(korisnickoIme, lozinka);
    if (!validacija.uspesno) {
      setGreska(validacija.poruka ?? "Неисправни подаци");
      return;
    }

    const odgovor = await authApi.prijava(korisnickoIme, lozinka);

    if (odgovor.success && odgovor.data) {
      const token = `${odgovor.data.korisnickoIme}/${odgovor.data.id}`;
      SačuvajVrednostPoKljuču("authToken", token);
      onLoginSuccess();
    } else {
      setGreska(odgovor.message);
      setKorisnickoIme("");
      setLozinka("");
    }
  };

  return (
    <div>
      <h1>Пријава</h1>
      <form onSubmit={podnesiFormu}>
        <div className="input-group">
          <label htmlFor="username">Корисничко име:</label>
          <input
            id="username"
            type="text"
            value={korisnickoIme}
            onChange={(e) => setKorisnickoIme(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Лозинка:</label>
          <input
            id="password"
            type="password"
            value={lozinka}
            onChange={(e) => setLozinka(e.target.value)}
            required
          />
        </div>

        {greska && <p className="error-message">{greska}</p>}

        <button type="submit">Пријава</button>
      </form>
    </div>
  );
}
