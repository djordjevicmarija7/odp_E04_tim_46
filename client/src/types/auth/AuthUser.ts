import type { UserRole } from "../users/UserRole";

export type AuthUser = {
    id: number;
    korisnickoIme: string;
    uloga: UserRole;
}