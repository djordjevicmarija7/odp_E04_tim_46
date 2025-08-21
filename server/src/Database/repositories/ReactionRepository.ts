import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../connection/DbConnectionPool";
import type { Reaction } from "../../Domain/models/Reaction";
import type { Reakcije } from "../../Domain/types/Reakcije";

export class ReactionRepository {
  async getByReportAndUser(reportId: number, userId: number): Promise<Reaction | null> {
    try {
      const query = `SELECT id, reportId, userId, reakcija as reakcija, createdAt FROM reactions WHERE reportId = ? AND userId = ? LIMIT 1`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [reportId, userId]);
      if (!rows || rows.length === 0) return null;
      const r = rows[0];
      return {
        id: r.id,
        reportId: r.reportId,
        userId: r.userId,
        reakcija: r.reakcija as Reakcije,
        createdAt: r.createdAt,
      } as Reaction;
    } catch (err) {
      console.error("ReactionRepository.getByReportAndUser error:", err);
      return null;
    }
  }


  async upsert(reportId: number, userId: number, reakcija: Reakcije): Promise<Reaction | null> {
    try {
      const now = new Date().toISOString().slice(0, 19).replace("T", " ");
      const query = `
        INSERT INTO reactions (reportId, userId, reakcija, createdAt)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE reakcija = VALUES(reakcija), createdAt = VALUES(createdAt)
      `;
      await db.execute<ResultSetHeader>(query, [reportId, userId, reakcija, now]);
      return await this.getByReportAndUser(reportId, userId);
    } catch (err) {
      console.error("ReactionRepository.upsert error:", err);
      return null;
    }
  }

  async getByReportIdsAndUser(reportIds: number[], userId: number): Promise<Reaction[]> {
    if (!reportIds || reportIds.length === 0) return [];
    try {
      const placeholders = reportIds.map(() => "?").join(",");
      const query = `SELECT id, reportId, userId, reakcija as reakcija, createdAt FROM reactions WHERE reportId IN (${placeholders}) AND userId = ?`;
      const params = [...reportIds, userId];
      const [rows] = await db.execute<RowDataPacket[]>(query, params);
      return rows.map((r) => ({
        id: r.id,
        reportId: r.reportId,
        userId: r.userId,
        reakcija: r.reakcija as Reakcije,
        createdAt: r.createdAt,
      } as Reaction));
    } catch (err) {
      console.error("ReactionRepository.getByReportIdsAndUser error:", err);
      return [];
    }
  }

  
  async countByReport(reportId: number) {
    try {
      const query = `SELECT reakcija, COUNT(*) as cnt FROM reactions WHERE reportId = ? GROUP BY reakcija`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [reportId]);
      const res: Record<string, number> = { like: 0, dislike: 0, neutral: 0 };
      for (const r of rows) {
        res[r.reakcija] = Number(r.cnt);
      }
      return res;
    } catch (err) {
      console.error("ReactionRepository.countByReport error:", err);
      return { like: 0, dislike: 0, neutral: 0 };
    }
  }
}
