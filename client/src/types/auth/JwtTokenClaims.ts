import type { UserRole } from "../users/UserRole";

export type JwtTokenClaims = {
    id: number;
    korisnickoIme: string;
    uloga: UserRole;
}