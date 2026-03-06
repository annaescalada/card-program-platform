import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'

import { IssueCardUseCase } from '../modules/card/application/use-case/issue-card.use-case'
import { BlockCardUseCase } from '../modules/card/application/use-case/block-card.use-case'
import { cardResolvers } from '../modules/card/infrastructure/graphql/resolvers/card.resolver'
import { cardTypeDefs } from '../modules/card/infrastructure/graphql/schema'
import { PrismaCardRepository } from '../modules/card/infrastructure/persistance/prisma-card.repository'

export async function createServer() {
    const app = express()

    //repositories
    const cardRepository = new PrismaCardRepository()

    //use cases
    const issueCard = new IssueCardUseCase(cardRepository, eventPublisher)
    const blockCard = new BlockCardUseCase(cardRepository, eventPublisher)
    const getCard = new GetCardUseCase(cardRepository)
    const getCards = new GetCardsUseCase(cardRepository)

    //apollo
    const server = new ApolloServer({
        typeDefs: [cardTypeDefs],
        resolvers: [cardResolvers({ issueCard, blockCard, getCard, getCards })],
    })

    await server.start()

    app.use(express.json())
    app.use('/graphql', expressMiddleware(server))

    return app
}