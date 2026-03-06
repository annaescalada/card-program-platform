import { CardResponseDto } from '../../dtos/card.dto'

export interface IGetCard {
  execute(id: string): Promise<CardResponseDto | null>
}