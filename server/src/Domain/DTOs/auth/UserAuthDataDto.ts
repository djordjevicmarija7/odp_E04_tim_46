import type { UserRole } from "../../types/UserRole";
export class UserAuthDataDto {
   public constructor(
        public id: number = 0,
        public korisnickoIme: string = '',
        public uloga: UserRole="stanar"
    ) {}
}