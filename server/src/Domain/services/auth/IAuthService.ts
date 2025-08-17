import { UserAuthDataDto } from "../../DTOs/auth/UserAuthDataDto";
import { UserRole } from "../../types/UserRole";

export interface IAuthService {

  prijava(korisnickoIme: string, lozinka: string): Promise<UserAuthDataDto>;

  registracija(korisnickoIme: string, uloga: UserRole, lozinka: string): Promise<UserAuthDataDto>;
}
