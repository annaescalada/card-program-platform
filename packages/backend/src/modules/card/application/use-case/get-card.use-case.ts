import { IGetCard } from '../ports/inbound/get-card.port'
import { ICardRepository } from '../ports/outbound/card.repository.port'
import { CardResponseDto } from '../dtos/card.dto'

export class GetCardUseCase implements IGetCard {
  constructor(private readonly cardRepository: ICardRepository) {}

  async execute(id: string): Promise<CardResponseDto | null> {
    return this.cardRepository.findById(id)
  }
}