import { useState } from "react";
import { RegistracijaForma } from "../../components/auth/RegistracijaForma";
import { PrijavaForma } from "../../components/auth/PrijavaForma";
import type { AuthFormProps } from "../../types/props/auth_form_props/AuthFormProps";

export default function AuthStranica({ authApi, onLoginSuccess }: AuthFormProps) {
  const [jeRegistracija, setJeRegistracija] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFFBF7] via-[#FFF6EC] to-[#FFF2E0] flex items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-6 w-full max-w-md">
        {jeRegistracija ? (
          <RegistracijaForma authApi={authApi} onLoginSuccess={onLoginSuccess} />
        ) : (
          <PrijavaForma authApi={authApi} onLoginSuccess={onLoginSuccess} />
        )}

        <button
          onClick={() => setJeRegistracija(!jeRegistracija)}
          className="mt-2 px-4 py-2 rounded-xl bg-white/40 backdrop-blur-lg shadow hover:brightness-105 transition text-gray-700 font-medium"
        >
          {jeRegistracija
            ? "Već imate nalog? Prijavite se"
            : "Nemate nalog? Registrujte se"}
        </button>
      </div>
    </main>
  );
}
