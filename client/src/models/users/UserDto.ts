import type { UserRole } from "../../types/users/UserRole";

export interface UserDto {
    id: number;
    korisnickoIme: string;
    uloga: UserRole;
}