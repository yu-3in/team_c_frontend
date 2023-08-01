import { Ticket } from '../../types/ticket'
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import AlarmOnIcon from '@mui/icons-material/AlarmOn'
import { Avatar, CardActionArea, CardContent, Chip } from '@mui/material'

export type TicketsCardProps = { ticket: Ticket }

export const TicketsCard: React.FC<TicketsCardProps> = ({ ticket }) => {
  return (
    <div className="rounded-xl bg-white shadow">
      <CardActionArea>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div>
                <div className="flex items-center gap-2">
                  <PanoramaFishEyeIcon className="truncate text-[#636366]" />
                  <div className="text-lg">{ticket.title}</div>
                </div>
                <div className="truncate pl-4 text-sm text-[#636366]">{ticket.description}</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <AlarmOnIcon fontSize="small" />
                    <div className="text-[#636366]">{ticket.dueDate}</div>
                  </div>
                  <Chip
                    label={ticket.genre.title}
                    size="small"
                    sx={{
                      backgroundColor: ticket.genre.color,
                    }}
                  />
                </div>
              </div>
            </div>
            <Avatar></Avatar>
          </div>
        </CardContent>
      </CardActionArea>
    </div>
  )
}
