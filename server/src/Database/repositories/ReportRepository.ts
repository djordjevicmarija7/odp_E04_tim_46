import { IReportRepository } from "../../Domain/repositories/reports/IReportRepository";
import { Report } from "../../Domain/models/Report";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import {Reaction} from "../../Domain/models/Reaction"
import db from "../connection/DbConnectionPool";

export class ReportRepository implements IReportRepository{
  async create(report: Report): Promise<Report> {
    try {
      const query = `
        INSERT INTO reports (userId, naslov, opis, imagePath, adresa)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await db.execute<ResultSetHeader>(query, [
        report.userId,
        report.naslov,
        report.opis,
        report.imagePath,
        report.adresa,
      ]);

      if (result.insertId) {
        return new Report(
          result.insertId,
          report.userId,
          report.naslov,
          report.opis,
          report.imagePath,
          report.adresa
        );
      }

      return new Report();
    } catch (error) {
      console.error("Error creating report:", error);
      return new Report();
    }
  }

  async getById(id: number): Promise<Report> {
    try {
      const query = `SELECT * FROM reports WHERE id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      if (rows.length > 0) {
        const r = rows[0];
        return new Report(
          r.id,
          r.userId,
          r.naslov,
          r.opis,
          r.imagePath,
          r.adresa,
          r.createdAt ? new Date(r.createdAt).toISOString() : "",
          r.status,
          r.cena,
          r.masterComment,
          r.masterId
        );
      }

      return new Report();
    } catch (error) {
      console.error("Error getting report by id:", error);
      return new Report();
    }
  }

  async getByUser(userId: number, status?: string | null, sortBy?: 'createdAt' | 'cena', order: 'ASC' | 'DESC' = 'DESC'): Promise<Report[]> {
    try {
      let query = `SELECT * FROM reports WHERE userId = ?`;
      const params: any[] = [userId];

      if (status) {
        query += ` AND status = ?`;
        params.push(status);
      }

      if (sortBy) {
        query += ` ORDER BY ${sortBy} ${order}`;
      } else {
        query += ` ORDER BY createdAt ${order}`;
      }

      const [rows] = await db.execute<RowDataPacket[]>(query, params);
      return rows.map((r: any) => new Report(
        r.id, r.userId, r.naslov, r.opis, r.imagePath, r.adresa, r.createdAt ? new Date(r.createdAt).toISOString() : "", r.status, r.cena, r.masterComment, r.masterId
      ));
    } catch (error) {
      console.error("Error getting reports by user:", error);
      return [];
    }
  }

  async getAll(status?: string | null, sortBy?: 'createdAt' | 'cena', order: 'ASC' | 'DESC' = 'DESC'): Promise<Report[]> {
    try {
      let query = `SELECT * FROM reports WHERE 1=1`;
      const params: any[] = [];

      if (status) {
        query += ` AND status = ?`;
        params.push(status);
      }

      if (sortBy) {
        query += ` ORDER BY ${sortBy} ${order}`;
      } else {
        query += ` ORDER BY createdAt ${order}`;
      }

      const [rows] = await db.execute<RowDataPacket[]>(query, params);
      return rows.map((r: any) => new Report(
        r.id, r.userId, r.naslov, r.opis, r.imagePath, r.adresa, r.createdAt ? new Date(r.createdAt).toISOString() : "", r.status, r.cena, r.masterComment, r.masterId
      ));
    } catch (error) {
      console.error("Error getting all reports:", error);
      return [];
    }
  }

  async update(report: Report): Promise<Report> {
    try {
      const query = `
        UPDATE reports
        SET naslov = ?, opis = ?, imagePath = ?, adresa = ?, status = ?, cena = ?, masterComment = ?, masterId = ?
        WHERE id = ?
      `;
      const [result] = await db.execute<ResultSetHeader>(query, [
        report.naslov,
        report.opis,
        report.imagePath,
        report.adresa,
        report.status,
        report.cena,
        report.masterComment,
        report.masterId,
        report.id,
      ]);

      if (result.affectedRows > 0) {
        return report;
      }

      return new Report();
    } catch (error) {
      console.error("Error updating report:", error);
      return new Report();
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const query = `DELETE FROM reports WHERE id = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting report:", error);
      return false;
    }
  }

  async exists(id: number): Promise<boolean> {
    try {
      const query = `SELECT COUNT(*) as count FROM reports WHERE id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);
      return rows[0].count > 0;
    } catch (error) {
      console.error("Error checking report exists:", error);
      return false;
    }
  }

  async addReaction(reaction: Reaction): Promise<Reaction> {
    try {
      const query = `INSERT INTO reactions (reportId, userId, tip) VALUES (?, ?, ?)`;
      const [result] = await db.execute<ResultSetHeader>(query, [reaction.reportId, reaction.userId, reaction.reakcija]);

      if (result.insertId) {
        return new Reaction(result.insertId, reaction.reportId, reaction.userId, reaction.reakcija, new Date().toISOString());
      }

      return new Reaction();
    } catch (error) {
      console.error("Error adding reaction:", error);
      return new Reaction();
    }
  }
}