import './App.css'
import { useQuery } from '@apollo/client/react'
import type { Card } from '@card-platform/shared'
import CardForm from './components/CardForm'
import CardBox from './components/CardBox'
import { GET_CARDS } from './graphql/queries'

function App() {
  const { data: cardsData, error, loading } = useQuery<{ cards: Card[] }>(GET_CARDS)

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-5xl mx-auto">

        <div className="mb-10">
          <h1 className="text-2xl font-mono font-semibold tracking-tight text-zinc-100">
            Card Program Platform
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Manage your issued cards</p>
        </div>

        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
            {error.message}
          </div>
        ) : loading ? (
          <div className="text-zinc-500 text-sm font-mono animate-pulse">Loading...</div>
        ) : (
          <div className="flex flex-col gap-10">
            <CardForm />

            <div>
              <h2 className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-4">
                Available Cards
              </h2>
              {cardsData?.cards.length === 0 ? (
                <p className="text-zinc-600 text-sm">No cards issued yet.</p>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {cardsData?.cards.map((card: Card) => (
                    <CardBox key={card.id} card={card} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App