import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { IssueCardUseCase } from '../modules/card/application/use-case/issue-card.use-case'
import { BlockCardUseCase } from '../modules/card/application/use-case/block-card.use-case'
import { GetCardUseCase } from '../modules/card/application/use-case/get-card.use-case'
import { GetCardsUseCase } from '../modules/card/application/use-case/get-cards.use-case'
import { cardResolvers } from '../modules/card/infrastructure/graphql/resolvers/card.resolver'
import { cardTypeDefs } from '../modules/card/infrastructure/graphql/schema/card.schema'
import { PrismaCardRepository } from '../modules/card/infrastructure/persistance/prisma-card.repository'

export async function createServer() {
  const cardRepository = new PrismaCardRepository()

  const issueCard = new IssueCardUseCase(cardRepository, null as any)
  const blockCard = new BlockCardUseCase(cardRepository, null as any)
  const getCard = new GetCardUseCase(cardRepository)
  const getCards = new GetCardsUseCase(cardRepository)

  const server = new ApolloServer({
    typeDefs: cardTypeDefs,
    resolvers: cardResolvers({ issueCard, blockCard, getCard, getCards }),
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.log(`🚀 Server ready at ${url}`)
}