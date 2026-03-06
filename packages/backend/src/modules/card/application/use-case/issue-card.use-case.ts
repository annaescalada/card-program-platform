import { IIssueCard } from '../ports/inbound/issue-card.port'
import { ICardRepository } from '../ports/outbound/card.repository.port'
import { ICardEventPublisher } from '../ports/outbound/card.event-publisher.port'
import { IssueCardDto, CardResponseDto } from '../dtos/card.dto'
import { Card } from '../../domain/card.entity'

export class IssueCardUseCase implements IIssueCard {
  constructor(
    private readonly cardRepository: ICardRepository,
    private readonly eventPublisher: ICardEventPublisher,
  ) {}

  async execute(dto: IssueCardDto): Promise<Card> {
    const card = Card.create(dto)
    const saved = await this.cardRepository.save(card)
    await this.eventPublisher.publishCardIssued(saved.id)
    return saved
  }
}