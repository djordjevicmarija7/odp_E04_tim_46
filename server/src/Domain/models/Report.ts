import { ReportStatus } from "../types/ReportStatus"

export class Report {
    public constructor(
        public id: Number = 0,
        public userId: Number = 0,
        public naslov: string = '',
        public opis: string = '',
        public imagePath: string | null = null,
        public adresa: string = '',
        public status: ReportStatus = 'Kreiran',
        public masterId: number | null = null,   // FK -> users.id (majstor) ili null
        public price: number | null = null,      // cena koju unosi majstor
        public masterComment: string | null = null,
        public createdAt: string = new Date().toISOString(),
        public updatedAt: string = new Date().toISOString()
    ) { }
}