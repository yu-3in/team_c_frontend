import { Button } from '@mui/material'
import { statusConfig } from '../../configs/status'
import { Status } from '../../types/status'
import { Ticket } from '../../types/ticket'
import { TicketsCard } from './TicketCard'
import AddIcon from '@mui/icons-material/Add'
import classNames from 'classnames'

export type TicketListProps = {
  tickets: Ticket[]
  color?: string
  status: Status
  onClick?: (ticket: Ticket) => void
  noItemOnClick?: () => void
  className?: string
}

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  status,
  onClick,
  noItemOnClick,
  className,
}) => {
  return (
    <div
      className={classNames('relative rounded-xl px-4 pb-4', className)}
      style={{ backgroundColor: statusConfig[status].color }}>
      <div
        className="sticky top-0 z-10 -mx-4 flex items-center gap-3 rounded-t-xl p-4 pl-2"
        style={{ backgroundColor: statusConfig[status].color }}>
        <div
          className="h-6 w-6 rounded-full"
          style={{ backgroundColor: statusConfig[status].circleColor }}></div>
        <h2 className="text-2xl font-bold">{statusConfig[status].title}</h2>
      </div>
      {tickets.length > 0 ? (
        <ul className="space-y-6">
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <TicketsCard ticket={ticket} onClick={onClick} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="font-weight flex flex-col items-center justify-center pb-8 pt-4">
          <Button variant="contained" color="info" startIcon={<AddIcon />} onClick={noItemOnClick}>
            作成する
          </Button>
        </div>
      )}
    </div>
  )
}
