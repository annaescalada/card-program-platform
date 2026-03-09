import { CardResponseDto } from "../../../application/dtos/card.dto";
import { IBlockCard } from "../../../application/ports/inbound/block-card.port";
import { IGetCard } from "../../../application/ports/inbound/get-card.port";
import { IGetCards } from "../../../application/ports/inbound/get-cards.port";
import { IIssueCard } from "../../../application/ports/inbound/issue-card.port";
import { Resolvers } from '@card-platform/shared'

interface CardResolverDeps {
    issueCard: IIssueCard
    blockCard: IBlockCard
    getCards: IGetCards
    getCard: IGetCard
}

export const toGqlCard = (card: CardResponseDto) => ({
  ...card,
  createdAt: card.createdAt.toISOString()
})

export const cardResolvers = (deps: CardResolverDeps): Resolvers => ({
  Query: {
    card: async (_, { id }) => {
      const card = await deps.getCard.execute(id)
      return card ? toGqlCard(card) : null
    },
    cards: async () => {
      const cards = await deps.getCards.execute()
      return cards.map(toGqlCard)
    }
  },
  Mutation: {
    issueCard: async (_, { input }) => toGqlCard(await deps.issueCard.execute(input)),
    blockCard: async (_, { id }) => toGqlCard(await deps.blockCard.execute({ id })),
  }
})