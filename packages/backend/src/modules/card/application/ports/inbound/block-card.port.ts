import { BlockCardDto, CardResponseDto } from '../../dtos/card.dto'

export interface IBlockCard {
  execute(dto: BlockCardDto): Promise<CardResponseDto>
}