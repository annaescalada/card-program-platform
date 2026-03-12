import type { Card } from "@card-platform/shared"

const CardBox: React.FC<{ card: Card }> = ({ card }) => {
    return (
        <div key={card.id}>
            <p>Balance: {card.balance}</p>
            <p>Card Number: {card.cardNumber}</p>
            <p>Created At: {card.createdAt}</p>
            <p>Status: {card.status}</p>
        </div>
    )
}

export default CardBox