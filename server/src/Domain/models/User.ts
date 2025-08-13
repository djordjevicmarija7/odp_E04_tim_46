import {UserRole} from "../types/UserRole"
export class User {
  public constructor(
    public id: number = 0,
    public korisnickoIme: string = '',
    public uloga: UserRole = 'stanar',
    public lozinka: string = ''
  ) {}
}