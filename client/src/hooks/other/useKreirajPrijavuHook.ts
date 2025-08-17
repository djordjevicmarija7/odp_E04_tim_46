import { useState, useCallback } from "react";
import type { ReportDto } from "../../models/reports/ReportDto";
import type { ApiResponse } from "../../types/API/ApiResponse";
import type { CreateReportPayload } from "../../types/reports/CreateReportPayload";
import { reportsApi } from "../../api_services/reports/ReportAPIService";
import { useAuth } from "../../hooks/auth/useAuthHook"; 

export function useKreirajPrijavu() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [loading, setLoading] = useState<boolean>(authLoading);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const kreiraj = useCallback(
    async (payload: CreateReportPayload) => {
      if (authLoading) return { ok: false, message: "Sačekajte, učitava se autentifikacija." };
      if (!isAuthenticated) return { ok: false, message: "Niste prijavljeni." };

      setLoading(true);
      setError(null);
      setSuccessMessage(null);
      try {
        const res: ApiResponse<ReportDto> = await reportsApi.kreirajPrijavu(payload);
        if (!res.success) {
          setError(res.message ?? "Greška pri kreiranju prijave.");
          return { ok: false, message: res.message ?? "Greška" };
        }
        setSuccessMessage(res.message ?? "Prijava kreirana.");
        return { ok: true, data: res.data };
      } catch (err: any) {
        setError(err?.message ?? "Neočekivana greška.");
        return { ok: false, message: err?.message ?? "Neočekivana greška." };
      } finally {
        setLoading(false);
      }
    },
    [authLoading, isAuthenticated]
  );

  const reset = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return { kreiraj, loading, error, successMessage, reset };
}
