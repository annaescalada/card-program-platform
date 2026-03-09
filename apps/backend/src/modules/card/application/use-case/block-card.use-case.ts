import { IBlockCard } from '../ports/inbound/block-card.port'
import { ICardRepository } from '../ports/outbound/card.repository.port'
import { ICardEventPublisher } from '../ports/outbound/card.event-publisher.port'
import { BlockCardDto, CardResponseDto } from '../dtos/card.dto'

export class BlockCardUseCase implements IBlockCard {
  constructor(
    private readonly cardRepository: ICardRepository,
    private readonly eventPublisher: ICardEventPublisher,
  ) {}

  async execute(dto: BlockCardDto): Promise<CardResponseDto> {
    const card = await this.cardRepository.findById(dto.id)
    if (!card) throw new Error(`Card ${dto.id} not found`)
    card.block()
    const saved = await this.cardRepository.save(card)
    await this.eventPublisher.publishCardBlocked(saved.id)
    return saved
  }
}