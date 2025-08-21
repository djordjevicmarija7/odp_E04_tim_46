import { useState } from "react";
import { RegistracijaForma } from "../../components/auth/RegistracijaForma";
import { PrijavaForma } from "../../components/auth/PrijavaForma";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";

export default function AuthStranica({ authApi, onLoginSuccess }: AuthFormProps) {
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
            ? "Imate nalog? Prijavite se"
            : "Nemate nalog? Registrujte se"}
        </button>
      </div>
    </div>
  );
}