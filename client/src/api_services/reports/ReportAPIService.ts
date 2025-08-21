import type { QueryParams } from "../../types/pomocne/QueryParms";
import type { CreateReportPayload } from "../../types/reports/CreateReportPayload";
import type { FinishReportPayload } from "../../types/reports/FinishReportPayload";
import type { ReactionType } from "../../types/reactions/ReactionType";
import type { ReportDto } from "../../models/reports/ReportDto";
import type { ApiResponse } from "../../types/API/ApiResponse";
import type { IReportsAPIService } from "../reports/IReportAPIService";

import axios from "axios";
import { PročitajVrednostPoKljuču } from "../../helpers/local_storage"; 

const RAW_API = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api/v1";
const API_BASE = RAW_API.endsWith("/") ? RAW_API : RAW_API + "/";
const API_URL: string = API_BASE + "reports";

export const reportsApi: IReportsAPIService = {
  async getSviIzvestaji(params?: QueryParams): Promise<ApiResponse<ReportDto[]>> {
    try {
      const token = PročitajVrednostPoKljuču("authToken");
     
      const res = await axios.get<ApiResponse<ReportDto[]>>(`${API_URL}/all`, {
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    } catch (error) {
      let message = "Грешка при преузимању пријава.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return { success: false, message, data: [] };
    }
  },

  async getPrijaveKorisnika(params?: QueryParams): Promise<ApiResponse<ReportDto[]>> {
    try {
      const token = PročitajVrednostPoKljuču("authToken");
      
      const res = await axios.get<ApiResponse<ReportDto[]>>(`${API_URL}`, {
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    } catch (error) {
      let message = "Грешка при преузимању Ваших пријава.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return { success: false, message, data: [] };
    }
  },

  async kreirajPrijavu(payload: CreateReportPayload | FormData): Promise<ApiResponse<ReportDto>> {
    try {
      const token = PročitajVrednostPoKljuču("authToken");
      const res = await axios.post<ApiResponse<ReportDto>>(`${API_URL}`, payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    } catch (error) {
      let message = "Грешка при креирању пријаве.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return { success: false, message };
    }
  },

  async getPrijavaById(id: number): Promise<ApiResponse<ReportDto>> {
    try {
      const token = PročitajVrednostPoKljuču("authToken");
      const res = await axios.get<ApiResponse<ReportDto>>(`${API_URL}/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    } catch (error) {
      let message = "Грешка при преузимању детаља пријаве.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return { success: false, message };
    }
  },

  async prihvatiPrijavu(id: number): Promise<ApiResponse<null>> {
    try {
      const token = PročitajVrednostPoKljuču("authToken");
      const res = await axios.put<ApiResponse<null>>(`${API_URL}/${id}/accept`, null, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    } catch (error) {
      let message = "Грешка при прихватању пријаве.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return { success: false, message };
    }
  },

  async zavrsiPrijavu(id: number, body: FinishReportPayload): Promise<ApiResponse<null>> {
    try {
      const token = PročitajVrednostPoKljuču("authToken");
      const res = await axios.put<ApiResponse<null>>(`${API_URL}/${id}/finish`, body, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    } catch (error) {
      let message = "Грешка при завршетку пријаве.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return { success: false, message };
    }
  },

  async dodajReakciju(id: number, reakcija: ReactionType): Promise<ApiResponse<null>> {
    try {
      const token = PročitajVrednostPoKljuču("authToken");
      const res = await axios.post<ApiResponse<null>>(`${API_URL}/${id}/reaction`, { reakcija }, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.data;
    } catch (error) {
      let message = "Грешка при слању реакције.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      return { success: false, message };
    }
  },
};
