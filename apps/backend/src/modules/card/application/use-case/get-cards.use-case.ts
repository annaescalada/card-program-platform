import { IGetCards } from '../ports/inbound/get-cards.port'
import { ICardRepository } from '../ports/outbound/card.repository.port'
import { CardResponseDto } from '../dtos/card.dto'

export class GetCardsUseCase implements IGetCards {
  constructor(private readonly cardRepository: ICardRepository) {}

  async execute(): Promise<CardResponseDto[]> {
    return this.cardRepository.findAll()
  }
}