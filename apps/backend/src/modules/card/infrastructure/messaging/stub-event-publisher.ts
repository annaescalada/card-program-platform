import { ICardEventPublisher } from '../../application/ports/outbound/card.event-publisher.port'

export class StubEventPublisher implements ICardEventPublisher {
  async publishCardIssued(cardId: string): Promise<void> {
    console.log(`[STUB] CardIssued: ${cardId}`)
  }

  async publishCardBlocked(cardId: string): Promise<void> {
    console.log(`[STUB] CardBlocked: ${cardId}`)
  }
}