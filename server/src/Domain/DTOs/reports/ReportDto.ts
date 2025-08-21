import { ReportStatus } from "../../types/ReportStatus"
import { Reaction } from "../../models/Reaction"
export class ReportDto {
    public constructor(
        public id: Number = 0,
        public naslov: string = '',
        public opis: string = '',
        public imagePath: string | null = null,
        public adresa: string = '',
        public createdAt: string = new Date().toISOString(),
        public status: ReportStatus = 'Kreiran',
        public cena: number | null = null,  
        public masterComment: string | null = null,
        public userReaction?: Reaction | null
    ) { }
}