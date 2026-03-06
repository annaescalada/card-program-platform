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
  status: string
  balance: number
  createdAt: Date
}