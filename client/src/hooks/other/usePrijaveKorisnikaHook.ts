import { useEffect, useState, useCallback } from "react";
import type { ReportDto } from "../../models/reports/ReportDto";
import type { ApiResponse } from "../../types/API/ApiResponse";
import type { QueryParams } from "../../types/pomocne/QueryParms";
import { reportsApi } from "../../api_services/reports/ReportAPIService";
import { useAuth } from "../../hooks/auth/useAuthHook"; 

export function usePrijaveKorisnika(initialParams?: QueryParams) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [reports, setReports] = useState<ReportDto[]>([]);
  const [loading, setLoading] = useState<boolean>(authLoading);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<QueryParams | undefined>(initialParams);

  const load = useCallback(
    async (p?: QueryParams) => {
      if (authLoading) return;
      if (!isAuthenticated) {
        setReports([]);
        setLoading(false);
        setError("Niste prijavljeni.");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res: ApiResponse<ReportDto[]> = await reportsApi.getPrijaveKorisnika(p ?? params);
        if (!res.success) {
          setError(res.message ?? "Greška pri učitavanju prijava.");
          setReports(res.data ?? []);
        } else {
          setReports(res.data ?? []);
        }
      } catch (err: any) {
        setError(err?.message ?? "Neočekivana greška.");
        setReports([]);
      } finally {
        setLoading(false);
      }
    },
    [authLoading, isAuthenticated, params]
  );

  useEffect(() => {
    if (authLoading) {
      setLoading(true);
      return;
    }
  
    if (isAuthenticated) load(params);
    else {
      setReports([]);
      setLoading(false);
    }
  }, [authLoading, isAuthenticated, load, params]);

  return {
    reports,
    loading,
    error,
    params,
    setParams,
    refetch: () => load(params),
  };
}