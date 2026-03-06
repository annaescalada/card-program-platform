import { IssueCardDto, CardResponseDto } from '../../dtos/card.dto'

export interface IIssueCard {
  execute(dto: IssueCardDto): Promise<CardResponseDto>
}