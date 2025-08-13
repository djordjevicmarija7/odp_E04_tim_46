import { ReportStatus } from "../../types/ReportStatus"

export class ReportDto {
    public constructor(
        public id: Number = 0,
        public naslov: string = '',
        public opis: string = '',
        public imagePath: string | null = null,
        public adresa: string = '',
        public status: ReportStatus = 'Kreiran',
        public createdAt: string = new Date().toISOString(),
        public price: number | null = null,      // cena koju unosi majstor
        public masterComment: string | null = null,

    ) { }
}