import { UserRole } from "../../types/UserRole";

export class UserDto {
  public constructor(
    public id: number = 0,
    public korisnickoIme: string = "",
    public uloga: UserRole="stanar",
  ) {}
}
