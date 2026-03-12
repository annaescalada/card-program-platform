import type { Card } from "@card-platform/shared"

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  BLOCKED: "bg-red-500/10 text-red-400 border border-red-500/20",
  EXPIRED: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20",
}

const CardBox: React.FC<{ card: Card }> = ({ card }) => {
  const formatted = card.cardNumber.replace(/(.{4})/g, "$1 ").trim()

  return (
    <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-80 shadow-xl overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600/10 rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="flex justify-between items-start mb-8">
        <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
          Card
        </span>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyles[card.status]}`}>
          {card.status}
        </span>
      </div>

      <p className="text-zinc-200 font-mono text-lg tracking-widest mb-6">
        {formatted}
      </p>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-zinc-500 text-xs mb-1">Balance</p>
          <p className="text-white text-xl font-semibold">
            ${card.balance.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-zinc-500 text-xs mb-1">Since</p>
          <p className="text-zinc-400 text-xs font-mono">
            {new Date(card.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardBox