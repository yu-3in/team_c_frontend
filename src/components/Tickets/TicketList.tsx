import { statusConfig } from '../../configs/status'
import { Status } from '../../types/status'
import { Ticket } from '../../types/ticket'
import { TicketsCard } from './TicketCard'

export type TicketListProps = {
  tickets: Ticket[]
  color?: string
  status: Status
  onClick?: (ticket: Ticket) => void
}

export const TicketList: React.FC<TicketListProps> = ({ tickets, status, onClick }) => {
  return (
    <ul
      className="min-w-[340px] list-none space-y-6 rounded-xl p-4"
      style={{ backgroundColor: statusConfig[status].color }}>
      <div className="flex items-center gap-3 pl-2">
        <div
          className="h-6 w-6 rounded-full"
          style={{ backgroundColor: statusConfig[status].circleColor }}></div>
        <h2 className="text-2xl font-bold">{statusConfig[status].title}</h2>
      </div>

      {tickets.map((ticket) => (
        <li key={ticket.id}>
          <TicketsCard ticket={ticket} onClick={onClick} />
        </li>
      ))}
    </ul>
  )
}
