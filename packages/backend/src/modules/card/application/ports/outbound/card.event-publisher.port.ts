export interface ICardEventPublisher {
  publishCardIssued(cardId: string): Promise<void>
  publishCardBlocked(cardId: string): Promise<void>
}