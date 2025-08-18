import { IReactionRepository } from "../../Domain/repositories/reactions/IReactonRepository";
import { Reaction } from "../../Domain/models/Reaction";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../connection/DbConnectionPool";

export class ReportRepository implements IReactionRepository {
  async create(reaction: Reaction): Promise<Reaction> {
    try {
      const query = `
        INSERT INTO reactions ( reportId, userId, reakcija) 
        VALUES ( ?, ?, ?)
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        reaction.reportId,
        reaction.userId,
        reaction.reakcija,
      ]);


      if (result.insertId) {
        return new Reaction(result.insertId,reaction.reportId, reaction.userId,reaction.reakcija);
      }

      return new Reaction();
    } catch (error) {
      console.error('Error creating reaction:', error);
      return new Reaction();
    }
  }

  async getById(id: number): Promise<Reaction> {
    try {
      const query = `SELECT *FROM reactions WHERE id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Reaction(row.id, row.reportId ,row.userId, row.reakcija);
      }

      return new Reaction();
    } catch {
      return new Reaction();
    }
  }

  async getAll(): Promise<Reaction[]> {
    try {
      const query = `SELECT * FROM reactions ORDER BY id ASC`;
      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) => new Reaction(row.id, row.reportId ,row.userId, row.reakcija)
      );
    } catch {
      return [];
    }
  }

  async update(reaction: Reaction): Promise<Reaction> {
    try {
      const query = `
        UPDATE reactions 
        SET reakcija = ?
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        reaction.reakcija,
        reaction.id
      ]);

      if (result.affectedRows > 0) {
        return reaction;
      }

      return new Reaction();
    } catch {
      return new Reaction();
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const query = `
        DELETE FROM reactions 
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
        FROM reactions 
        WHERE id = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      return rows[0].count > 0;
    } catch {
      return false;
    }
  }
}