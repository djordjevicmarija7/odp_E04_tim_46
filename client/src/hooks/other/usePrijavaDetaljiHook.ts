import { useEffect, useState, useCallback } from "react";
import type { ReportDto } from "../../models/reports/ReportDto";
import type { ApiResponse } from "../../types/API/ApiResponse";
import { reportsApi } from "../../api_services/reports/ReportAPIService";
import { useAuth } from "../../hooks/auth/useAuthHook"; 

export function usePrijavaDetalji(prijavaId?: number | null) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [report, setReport] = useState<ReportDto | null>(null);
  const [loading, setLoading] = useState<boolean>(authLoading);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (id?: number | null) => {
      if (authLoading) return;
      const realId = id ?? prijavaId;
      if (!realId) return;
      if (!isAuthenticated) {
        setError("Niste prijavljeni.");
        setReport(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res: ApiResponse<ReportDto> = await reportsApi.getPrijavaById(realId);
        if (!res.success) {
          setError(res.message ?? "Greška pri preuzimanju detalja.");
          setReport(res.data ?? null);
        } else {
          setReport(res.data ?? null);
        }
      } catch (err: any) {
        setError(err?.message ?? "Neočekivana greška.");
        setReport(null);
      } finally {
        setLoading(false);
      }
    },
    [authLoading, isAuthenticated, prijavaId]
  );

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }
    if (prijavaId && isAuthenticated) load(prijavaId);
    else if (!isAuthenticated) {
      setLoading(false);
      setError("Niste prijavljeni.");
      setReport(null);
    }
  }, [authLoading, isAuthenticated, prijavaId, load]);

  return { report, loading, error, refetch: () => load(prijavaId) };
}
