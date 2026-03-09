export const cardStatus = ['ACTIVE', 'BLOCKED', 'EXPIRED'] as const

export type CardStatus = typeof cardStatus[number]

export interface IssueCardInput {
    cardNumber: string
    initialBalance: number
}

export class Card {
    id: string
    cardNumber: string
    status: CardStatus
    balance: number
    createdAt: Date

    private constructor(props: {
        id: string
        cardNumber: string
        status: CardStatus
        balance: number
        createdAt: Date
    }) {
        this.id = props.id
        this.cardNumber = props.cardNumber
        this.status = props.status
        this.balance = props.balance
        this.createdAt = props.createdAt
    }

    static create(input: IssueCardInput): Card {
        return new Card({
            id: crypto.randomUUID(),
            cardNumber: input.cardNumber,
            status: 'ACTIVE',
            balance: input.initialBalance,
            createdAt: new Date(),
        })
    }

    static fromPersistence(props: {
        id: string
        cardNumber: string
        status: string
        balance: number
        createdAt: Date
    }): Card {
        if (!cardStatus.includes(props.status as CardStatus)) {
            throw new Error(`Invalid card status: ${props.status}`)
        }

        return new Card({
            ...props,
            status: props.status as CardStatus,
        })
    }

    block(): void {
        if (this.status !== 'ACTIVE') {
            throw new Error('Only active cards can be blocked')
        }
        this.status = 'BLOCKED'
    }
}