import './App.css'
import { useQuery } from '@apollo/client/react'
import type { Card } from '@card-platform/shared'
import CardForm from './components/CardForm'
import CardBox from './components/CardBox'
import { GET_CARDS } from './graphql/queries'


function App() {
  const { data: cardsData, error, loading } = useQuery<{ cards: Card[] }>(GET_CARDS)

  return (
    <>
      <h1>Card Program Platform</h1>
      {
        error
          ? <>
            <p>Error: {error.message}</p>
          </>
          : loading
            ? <p>Loading...</p>
            : <>
              <CardForm />
              <h2>Available cards:</h2>
              {cardsData?.cards.map((card: Card) => <CardBox key={card.id} card={card} />)}
            </>
      }
    </>
  )
}

export default App
