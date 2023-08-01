import { Status } from '../../types/status'
import { Ticket } from '../../types/ticket'
import { TicketsCard } from './TicketCard'

const statusConfig: {
  [key in Status]: {
    color: string
    title: string
    circleColor: string
  }
} = {
  todo: { color: '#ECEAEA', title: 'ToDo', circleColor: '#D1D1D6' },
  doing: { color: '#E4F0E3', title: 'In Progress', circleColor: '#339505' },
  done: { color: '#F3E4FA', title: 'Done', circleColor: '#7441E1' },
}

export type TicketListProps = {
  tickets: Ticket[]
  color?: string
  status: Status
}

export const TicketList: React.FC<TicketListProps> = ({ tickets, status }) => {
  return (
    <ul
      className="min-w-[340px] list-none space-y-6 rounded-xl p-4"
      style={{ backgroundColor: statusConfig[status].color }}>
      <div className="flex items-center gap-3 pl-2">
        <div
          className="h-6 w-6 rounded-full"
          style={{ backgroundColor: statusConfig[status].circleColor }}></div>
        <h2 className="text-3xl font-bold">{statusConfig[status].title}</h2>
      </div>

      {tickets.map((ticket) => (
        <li key={ticket.id}>
          <TicketsCard ticket={ticket} />
        </li>
      ))}
    </ul>
  )
}
