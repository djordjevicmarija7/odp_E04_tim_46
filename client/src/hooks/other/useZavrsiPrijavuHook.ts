import { useState, useCallback } from "react";
import type { ApiResponse } from "../../types/API/ApiResponse";
import type { FinishReportPayload } from "../../types/reports/FinishReportPayload";
import { reportsApi } from "../../api_services/reports/ReportAPIService";
import { useAuth } from "../../hooks/auth/useAuthHook";

export function useZavrsiPrijavu() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();

  const [loading, setLoading] = useState<boolean>(authLoading);
  const [error, setError] = useState<string | null>(null);

  const zavrsi = useCallback(
    async (id: number, body: FinishReportPayload) => {
      if (authLoading) return { ok: false, message: "Sačekajte, učitava se autentifikacija." };
      if (!isAuthenticated) return { ok: false, message: "Niste prijavljeni." };
      if (!user || user.uloga !== "majstor") return { ok: false, message: "Nemate dozvolu za ovu akciju." };

      setLoading(true);
      setError(null);
      try {
        const res: ApiResponse<null> = await reportsApi.zavrsiPrijavu(id, body);
        if (!res.success) {
          setError(res.message ?? "Greška pri završetku prijave.");
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
    [authLoading, isAuthenticated, user]
  );

  return { zavrsi, loading, error };
}
