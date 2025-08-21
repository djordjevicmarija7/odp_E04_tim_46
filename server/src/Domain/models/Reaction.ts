import {Reakcije} from "../types/Reakcije"

export class Reaction {
  public constructor(
    public id: number = 0,
    public reportId: number = 0,                
    public userId: number = 0,                   
    public reakcija: Reakcije = null,           
    public createdAt: string = new Date().toISOString()
  ) {}
}