import { Button, Skeleton } from '@mui/material'
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
  direction?: 'row' | 'column'
  noItemMessage?: string
  isLoading?: boolean
}

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  status,
  onClick,
  noItemOnClick,
  className,
  direction = 'column',
  noItemMessage,
  isLoading = false,
}) => {
  return (
    <div
      className={classNames(
        'relative rounded-xl px-4 pb-4',
        direction === 'row' && 'overflow-x-scroll',
        className
      )}
      style={{ backgroundColor: statusConfig[status].color }}>
      <div
        className="sticky left-0 top-0 z-10 -mx-4 flex items-center gap-3 rounded-t-xl p-4 pl-2"
        style={{ backgroundColor: statusConfig[status].color }}>
        <div
          className="h-6 w-6 rounded-full"
          style={{ backgroundColor: statusConfig[status].circleColor }}></div>
        <h2 className="text-2xl font-bold">{statusConfig[status].title}</h2>
      </div>
      {tickets.length > 0 ? (
        <ul
          className={classNames(
            'flex gap-6',
            direction === 'row' ? 'min-w-max max-w-full flex-row' : 'flex-col'
          )}>
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <TicketsCard ticket={ticket} onClick={onClick} />
            </li>
          ))}
        </ul>
      ) : (
        <>
          {isLoading ? (
            <div className="flex flex-col gap-8">
              <Skeleton height={120} variant="rectangular" />
              <Skeleton height={120} variant="rectangular" />
            </div>
          ) : (
            <>
              {noItemOnClick && (
                <div className="font-weight flex flex-col items-center justify-center pb-8 pt-4">
                  <Button
                    variant="contained"
                    color="info"
                    startIcon={<AddIcon />}
                    onClick={noItemOnClick}>
                    作成する
                  </Button>
                </div>
              )}
              {noItemMessage && (
                <p className="pb-4 text-center text-xl font-bold text-gray-700">{noItemMessage}</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
