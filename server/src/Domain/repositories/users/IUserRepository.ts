import { User } from "../../models/User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  getById(id: number): Promise<User>;
  getByUsername(korisnickoIme: string): Promise<User>;
  getAll(): Promise<User[]>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<boolean>;
  exists(id: number): Promise<boolean>;
}