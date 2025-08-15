import { Reaction } from "../../models/Reaction";

export interface IReactionRepository {
  create(reaction: Reaction): Promise<Reaction>;
  getById(id: number): Promise<Reaction>;
  getAll(): Promise<Reaction[]>;
  update(reaction: Reaction): Promise<Reaction>;
  delete(id: number): Promise<boolean>;
  exists(id: number): Promise<boolean>;
}