import { CardResponseDto } from '../../dtos/card.dto'

export interface IGetCards {
  execute(): Promise<CardResponseDto[]>
}