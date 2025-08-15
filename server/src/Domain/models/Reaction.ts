import {Reakcije} from "../types/Reakcije"

export class Reaction {
  public constructor(
    public id: number = 0,
    public reportId: number = 0,                 // FK -> reports.id
    public userId: number = 0,                   // FK -> users.id (ko ostavlja recenziju)
    public reakcija: Reakcije = null,            // 'like' | 'dislike' | 'neutral' | null
    public createdAt: string = new Date().toISOString()
  ) {}
}