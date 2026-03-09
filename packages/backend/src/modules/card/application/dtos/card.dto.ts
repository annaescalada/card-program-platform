import { CardStatus } from "../../domain/card.entity"

export interface IssueCardDto {
  cardNumber: string
  initialBalance: number
}

export interface BlockCardDto {
  id: string
}

export interface CardResponseDto {
  id: string
  cardNumber: string
  status: CardStatus
  balance: number
  createdAt: Date
}