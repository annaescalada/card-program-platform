import { useMutation } from "@apollo/client/react"
import type { Card } from "@card-platform/shared"
import { ISSUE_CARD } from "../graphql/mutations"

const CardForm: React.FC = () => {
    const [issueCard, { loading }] = useMutation<{ issueCard: Card }>(ISSUE_CARD, {
        update(cache, { data }) {
            if (!data) return

            cache.modify({
                fields: {
                    cards(existingCards = []) {
                        return [...existingCards, data.issueCard]
                    }
                }
            })
        }
    })
    const onCreateCardSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const cardNumber = formData.get('cardNumber')?.toString()
        const balance = formData.get('balance')?.toString()

        if (!cardNumber || !balance) return

        await issueCard({
            variables: {
                input: {
                    cardNumber,
                    initialBalance: parseFloat(balance),
                }
            }
        })

        e.currentTarget.reset()
    }

    return <>
        <h2>Issue card:</h2>
        <form onSubmit={onCreateCardSubmit}>
            <label>Card Number:
                <input type="text" name="cardNumber" />
            </label>
            <label>Card Balance:
                <input type="number" name="balance" />
            </label>
            <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create"}
            </button>
        </form></>
}

export default CardForm