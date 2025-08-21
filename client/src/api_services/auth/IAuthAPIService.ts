import type { AuthResponse } from "../../types/auth/AuthResponse";
import type { UserRole } from "../../types/users/UserRole";


export interface IAuthAPIService {
  prijava(korisnickoIme: string, lozinka: string): Promise<AuthResponse>;
  registracija(korisnickoIme: string, lozinka: string, uloga: UserRole): Promise<AuthResponse>;
}