import { UserAuthDataDto } from "../../DTOs/auth/UserAuthDataDto";
import { UserRole } from "../../types/UserRole";

export interface IAuthService {

  prijava(korisnickoIme: string, lozinka: string): Promise<UserAuthDataDto>;

  registracija(korisnickoIme: string, lozinka: string, uloga: UserRole): Promise<UserAuthDataDto>;
}
