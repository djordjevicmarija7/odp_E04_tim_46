import { ReportStatus } from "../types/ReportStatus"

export class Report {
    public constructor(
        public id: Number = 0,
        public userId: Number = 0,
        public naslov: string = '',
        public opis: string = '',
        public imagePath: string | null = null,
        public adresa: string = '',
        public createdAt: string = new Date().toISOString(),
        public status: ReportStatus = 'Kreiran',
        public cena: number | null = null,      // cena koju unosi majstor
        public masterComment: string | null = null,
         public masterId: number | null = null,   // FK -> users.id (majstor) ili null

    ) { }
}