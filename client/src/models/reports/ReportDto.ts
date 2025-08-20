import type { ReportStatus } from "../../types/reports/ReportStatus";
import type { ReactionType } from "../../types/reactions/ReactionType";
export interface ReportDto {
        id: number,
        naslov: string,
        opis: string,
        imagePath: string,
        adresa: string,
        createdAt: string,
        status: ReportStatus,
        cena: number,
        masterComment: string,
        userReaction?: ReactionType | null;
}