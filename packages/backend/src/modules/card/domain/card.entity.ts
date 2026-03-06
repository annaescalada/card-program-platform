export type CardStatus = 'ACTIVE' | 'BLOCKED' | 'EXPIRED'

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

    block(): void {
        if (this.status !== 'ACTIVE') {
            throw new Error('Only active cards can be blocked')
        }
        this.status = 'BLOCKED'
    }
}