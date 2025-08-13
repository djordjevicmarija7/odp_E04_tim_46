import {Reaction} from "../types/Reactions"

export class Review {
  public constructor(
    public id: number = 0,
    public reportId: number = 0,                 // FK -> reports.id
    public userId: number = 0,                   // FK -> users.id (ko ostavlja recenziju)
    public reakcija: Reaction = null,            // 'like' | 'dislike' | 'neutral' | null
    public komentar: string | null = null,       // opcionalni tekst
    public createdAt: string = new Date().toISOString()
  ) {}
}