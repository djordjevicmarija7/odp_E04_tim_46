import { Review } from "../../models/Review";

export interface IReviewRepository {
  create(review: Review): Promise<Review>;
  getById(id: number): Promise<Review>;
  getAll(): Promise<Review[]>;
  update(review: Review): Promise<Review>;
  delete(id: number): Promise<boolean>;
  exists(id: number): Promise<boolean>;
}