import { Card } from "../../../domain/card.entity"

export interface ICardRepository {
  save(card: Card): Promise<Card>
  findById(id: string): Promise<Card | null>
  findAll(): Promise<Card[]>
}