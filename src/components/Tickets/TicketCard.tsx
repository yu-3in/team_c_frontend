import { Ticket } from '../../types/ticket'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import AlarmOnIcon from '@mui/icons-material/AlarmOn'
import AdjustIcon from '@mui/icons-material/Adjust'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { Avatar, CardActionArea, CardContent, Chip } from '@mui/material'
import { formatDateTime } from '../../uitls/date'

const StatusIcon: {
  [key in Ticket['status']]: React.ReactNode
} = {
  todo: <PanoramaFishEyeIcon className="text-[#636366]" />,
  doing: <AdjustIcon className="text-[#339505]" />,
  done: <TaskAltIcon className="text-[#7441E1]" />,
}

export type TicketsCardProps = {
  ticket: Ticket
  onClick?: (ticket: Ticket) => void
}

export const TicketsCard: React.FC<TicketsCardProps> = ({ ticket, onClick }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow">
      <CardActionArea onClick={() => onClick && onClick(ticket)}>
        <CardContent className="flex flex-col gap-[.75em]">
          <div className="grid grid-cols-12 items-center justify-between gap-2">
            <div className="col-span-10 flex flex-col">
              <div className="flex items-center gap-2">
                {StatusIcon[ticket.status]}
                <div className="text-lg">{ticket.title}</div>
              </div>
              <div className="truncate pl-4 text-sm text-[#636366]">{ticket.description}</div>
            </div>
            <div className="col-span-2">
              <Avatar></Avatar>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <AlarmOnIcon fontSize="small" />
              <div className="text-[#636366]">
                {ticket.dueDate && formatDateTime(ticket.dueDate)}
              </div>
            </div>
            <Chip
              label={ticket.Genre?.title}
              size="small"
              color="primary"
              // sx={{
              //   backgroundColor: ticket.Genre?.color,
              // }}
            />
          </div>
        </CardContent>
      </CardActionArea>
    </div>
  )
}
