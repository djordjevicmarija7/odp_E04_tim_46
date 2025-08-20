import type { QueryParams } from "../../types/pomocne/QueryParms";
import type {CreateReportPayload} from "../../types/reports/CreateReportPayload"
import type {FinishReportPayload} from "../../types/reports/FinishReportPayload"
import type { ReactionType } from "../../types/reactions/ReactionType";
import type { ReportDto } from "../../models/reports/ReportDto";
import type { ApiResponse } from "../../types/API/ApiResponse";

export interface IReportsAPIService {
  
  getSviIzvestaji(params?: QueryParams): Promise<ApiResponse<ReportDto[]>>;

  
  getPrijaveKorisnika(params?: QueryParams): Promise<ApiResponse<ReportDto[]>>;

 
  kreirajPrijavu(payload: CreateReportPayload | FormData): Promise<ApiResponse<ReportDto>>;

  getPrijavaById(id: number): Promise<ApiResponse<ReportDto>>;

  prihvatiPrijavu(id: number): Promise<ApiResponse<null>>;

  zavrsiPrijavu(id: number, body: FinishReportPayload): Promise<ApiResponse<null>>;
  dodajReakciju(id: number, reakcija: ReactionType): Promise<ApiResponse<null>>;
}