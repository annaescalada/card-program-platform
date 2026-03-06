import { IBlockCard } from "../../../application/ports/inbound/block-card.port";
import { IGetCard } from "../../../application/ports/inbound/get-card.port";
import { IGetCards } from "../../../application/ports/inbound/get-cards.port";
import { IIssueCard } from "../../../application/ports/inbound/issue-card.port";

interface CardResolverDeps {
    issueCard: IIssueCard
    blockCard: IBlockCard
    getCards: IGetCards
    getCard: IGetCard
}

export const cardResolvers = (deps: CardResolverDeps) => ({
    Query: {
        card: (_: unknown, { id }: { id: string }) => deps.getCard.execute(id),
        cards: () => deps.getCards.execute()
    },
    Mutation: {
        Mutation: {
            issueCard: (_: unknown, { input }: { input: { cardNumber: string; initialBalance: number } }) =>
                deps.issueCard.execute(input),
            blockCard: (_: unknown, { id }: { id: string }) =>
                deps.blockCard.execute({ id }),
        },
    }
})