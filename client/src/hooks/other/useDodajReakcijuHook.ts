import {  useState, useCallback } from "react";
import type { ApiResponse } from "../../types/API/ApiResponse";
import type { ReactionType } from "../../types/reactions/ReactionType";
import { reportsApi } from "../../api_services/reports/ReportAPIService";
import { useAuth } from "../../hooks/auth/useAuthHook"; 


export function useDodajReakciju() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [loading, setLoading] = useState<boolean>(authLoading);
  const [error, setError] = useState<string | null>(null);

  const dodaj = useCallback(
    async (id: number, reakcija: ReactionType) => {
      if (authLoading) return { ok: false, message: "Sačekajte, učitava se autentifikacija." };
      if (!isAuthenticated) return { ok: false, message: "Niste prijavljeni." };

      setLoading(true);
      setError(null);
      try {
        const res: ApiResponse<null> = await reportsApi.dodajReakciju(id, reakcija);
        if (!res.success) {
          setError(res.message ?? "Greška pri slanju reakcije.");
          return { ok: false, message: res.message };
        }
        return { ok: true };
      } catch (err: any) {
        setError(err?.message ?? "Neočekivana greška.");
        return { ok: false, message: err?.message ?? "Neočekivana greška." };
      } finally {
        setLoading(false);
      }
    },
    [authLoading, isAuthenticated]
  );

  return { dodaj, loading, error };
}
