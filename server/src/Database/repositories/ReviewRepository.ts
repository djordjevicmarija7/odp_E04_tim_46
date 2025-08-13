import { IReviewRepository } from "../../Domain/repositories/reviews/IReviewRepository";
import { Review } from "../../Domain/models/Review";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../connection/DbConnectionPool";

export class ReportRepository implements IReviewRepository {
  async create(review: Review): Promise<Review> {
    try {
      const query = `
        INSERT INTO reviews ( reportId, userId, reakcija, komentar) 
        VALUES ( ?, ?, ?, ?)
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        review.reportId,
        review.userId,
        review.reakcija,
        review.komentar
      ]);


      if (result.insertId) {
        return new Review(result.insertId,review.reportId, review.userId,review.reakcija, review.komentar);
      }

      return new Review();
    } catch (error) {
      console.error('Error creating review:', error);
      return new Review();
    }
  }

  async getById(id: number): Promise<Review> {
    try {
      const query = `SELECT *FROM review WHERE id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Review(row.id, row.reportId ,row.userId, row.reakcija, row.komentar);
      }

      return new Review();
    } catch {
      return new Review();
    }
  }

  async getAll(): Promise<Review[]> {
    try {
      const query = `SELECT *FROM reviews ORDER BY id ASC`;
      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) => new Review(row.id, row.reportId ,row.userId, row.reakcija, row.komentar)
      );
    } catch {
      return [];
    }
  }

  async update(review: Review): Promise<Review> {
    try {
      const query = `
        UPDATE reviews 
        SET komentar = ?
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        review.komentar,
        review.id
      ]);

      if (result.affectedRows > 0) {
        return review;
      }

      return new Review();
    } catch {
      return new Review();
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const query = `
        DELETE FROM reviews 
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [id]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async exists(id: number): Promise<boolean> {
    try {
      const query = `
        SELECT COUNT(*) as count 
        FROM reports 
        WHERE id = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      return rows[0].count > 0;
    } catch {
      return false;
    }
  }
}