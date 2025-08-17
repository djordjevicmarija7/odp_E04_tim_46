export type CreateReportPayload = {
  naslov?: string | null;
  opis: string;
  adresa: string;
  slikaBase64?: string | null;
};