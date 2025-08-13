import { IReportRepository } from "../../Domain/repositories/reports/IReportRepository";
import { Report } from "../../Domain/models/Report";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../connection/DbConnectionPool";

export class ReportRepository implements IReportRepository {
  async create(report: Report): Promise<Report> {
    try {
      const query = `
        INSERT INTO reports (naslov,userId, opis, imagePath, adresa) 
        VALUES (?, ?, ?, ?, ?)
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        report.naslov,
        report.userId,
        report.opis,
        report.imagePath,
        report.adresa,
      ]);


      if (result.insertId) {
        return new Report(result.insertId,report.userId, report.naslov, report.opis, report.imagePath, report.adresa);
      }

      return new Report();
    } catch (error) {
      console.error('Error creating report:', error);
      return new Report();
    }
  }

  async getById(id: number): Promise<Report> {
    try {
      const query = `SELECT *FROM reports WHERE id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Report(row.id, row.userId, row.naslov, row.opis, row.imagePath, row.adresa);
      }

      return new Report();
    } catch {
      return new Report();
    }
  }

  async getAll(): Promise<Report[]> {
    try {
      const query = `SELECT *FROM reports ORDER BY id ASC`;
      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) => new Report(row.id, row.userId, row.naslov, row.opis, row.imagePath, row.adresa)
      );
    } catch {
      return [];
    }
  }

  async update(report: Report): Promise<Report> {
    try {
      const query = `
        UPDATE reports 
        SET status = ?, masterId= ?, komentar =?, cena=?
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        report.status,
        report.masterId,
        report.masterComment,
        report.price
      ]);

      if (result.affectedRows > 0) {
        return report;
      }

      return new Report();
    } catch {
      return new Report();
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const query = `
        DELETE FROM reports 
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