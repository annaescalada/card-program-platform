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
      variables: { input: { cardNumber, initialBalance: parseFloat(balance) } }
    })
    e.currentTarget.reset()
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-80 shadow-xl">
      <h2 className="text-zinc-200 text-sm font-mono uppercase tracking-widest mb-6">
        Issue Card
      </h2>

      <form onSubmit={onCreateCardSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-zinc-500 text-xs">Card Number</span>
          <input
            type="text"
            name="cardNumber"
            placeholder="1234-5678-9012-3456"
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-200 font-mono text-sm placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-zinc-500 text-xs">Initial Balance</span>
          <input
            type="number"
            name="balance"
            placeholder="0.00"
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-200 font-mono text-sm placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white text-sm font-medium py-2 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Card"}
        </button>
      </form>
    </div>
  )
}

export default CardForm