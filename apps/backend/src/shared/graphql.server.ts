import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { IssueCardUseCase } from '../modules/card/application/use-case/issue-card.use-case'
import { BlockCardUseCase } from '../modules/card/application/use-case/block-card.use-case'
import { GetCardUseCase } from '../modules/card/application/use-case/get-card.use-case'
import { GetCardsUseCase } from '../modules/card/application/use-case/get-cards.use-case'
import { cardResolvers } from '../modules/card/infrastructure/graphql/resolvers/card.resolver'
import { cardTypeDefs } from '../modules/card/infrastructure/graphql/schema/card.schema'
import { PrismaCardRepository } from '../modules/card/infrastructure/persistance/prisma-card.repository'
import { StubEventPublisher } from '../modules/card/infrastructure/messaging/stub-event-publisher'

export async function createServer() {
  const cardRepository = new PrismaCardRepository()
  const eventPublisher = new StubEventPublisher()

  const issueCard = new IssueCardUseCase(cardRepository, eventPublisher)
  const blockCard = new BlockCardUseCase(cardRepository, eventPublisher)
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