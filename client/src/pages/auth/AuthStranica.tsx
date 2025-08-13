import { useState } from "react";
import type { IAuthAPIService } from "../../api_services/auth/IAuthAPIService";
import { RegistracijaForma } from "../../components/autentifikacija/RegistracijaForma";
import { PrijavaForma } from "../../components/autentifikacija/PrijavaForma";

interface AuthStranicaProps {
  authApi: IAuthAPIService;
  onLoginSuccess: () => void;
}

export default function AuthStranica({ authApi, onLoginSuccess }: AuthStranicaProps) {
  const [jeRegistracija, setJeRegistracija] = useState(false);

  return (
   <div id="root">
      <div className="form-wrapper">
        {jeRegistracija ? (
          <RegistracijaForma authApi={authApi} onLoginSuccess={onLoginSuccess} />
        ) : (
          <PrijavaForma authApi={authApi} onLoginSuccess={onLoginSuccess} />
        )}

        <button
          onClick={() => setJeRegistracija(!jeRegistracija)}
          className="toggle-button"
        >
          {jeRegistracija
            ? "Имате налог? Пријавите се"
            : "Немате налог? Региструјте се"}
        </button>
      </div>
    </div>
  );
}