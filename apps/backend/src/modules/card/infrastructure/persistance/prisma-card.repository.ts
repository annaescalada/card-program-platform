import { prisma } from '@card-platform/database'
import { ICardRepository } from '../../application/ports/outbound/card.repository.port'
import { Card } from '../../domain/card.entity'

export class PrismaCardRepository implements ICardRepository {

    async save(card: Card): Promise<Card> {
        const saved = await prisma.card.upsert({
            where: { id: card.id },
            update: {
                status: card.status,
                balance: card.balance,
            },
            create: {
                id: card.id,
                cardNumber: card.cardNumber,
                status: card.status,
                balance: card.balance,
                createdAt: card.createdAt,
            },
        })
        return this.toDomain(saved)
    }

    async findById(id: string): Promise<Card | null> {
        const record = await prisma.card.findUnique({ where: { id } })
        if (!record) return null
        return this.toDomain(record)
    }

    async findAll(): Promise<Card[]> {
        const records = await prisma.card.findMany()
        return records.map(this.toDomain.bind(this))
    }

    private toDomain(record: {
        id: string
        cardNumber: string
        status: string
        balance: number
        createdAt: Date
    }): Card {
        return Card.fromPersistence({
            id: record.id,
            cardNumber: record.cardNumber,
            status: record.status,
            balance: record.balance,
            createdAt: record.createdAt,
        })
    }
}