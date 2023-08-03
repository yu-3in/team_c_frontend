import { Button, Container } from '@mui/material'
import { Layout } from '../components/Layout/Layout'
import { TicketList } from '../components/Tickets/TicketList'
import { Ticket } from '../types/ticket'
import { useState, useCallback } from 'react'
import { SidePanel } from '../components/Panel/SidePanel'
import { TicketForm } from '../components/Tickets/TicketForm'
import { useQuery } from 'react-query'
import { deleteTicket, getTickets } from '../apis/ticket'
import { Status } from '../types/status'
import AddIcon from '@mui/icons-material/Add'

export const Tickets: React.FC = () => {
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const [clickedTicket, setClickedTicket] = useState<Ticket>()
  const [targetStatus, setTargetStatus] = useState<Status>()
  const { data: tickets, refetch: refetchTickets } = useQuery(['tickets'], () => getTickets())

  const handleClickTicketCard = useCallback((ticket: Ticket) => {
    setOpenEditDrawer(true)
    setClickedTicket(ticket)
  }, [])

  return (
    <Layout>
      <Container maxWidth="xl">
        <div className="px-8">
          <div className="mb-4 flex justify-end">
            <Button
              variant="contained"
              color="info"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateDrawer(true)}>
              作成する
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="flex w-full gap-4 overflow-x-auto pb-2">
              {['todo', 'doing', 'done'].map((status) => (
                <div className="w-full" key={status}>
                  <TicketList
                    tickets={tickets?.filter((ticket) => ticket.status === status) ?? []}
                    status={status as Status}
                    onClick={handleClickTicketCard}
                    noItemOnClick={() => {
                      setOpenCreateDrawer(true)
                      setTargetStatus(status as Status)
                    }}
                    className="h-[75vh] min-w-[400px] overflow-y-auto"
                  />
                </div>
              ))}
            </div>
          </div>
          <SidePanel
            open={openEditDrawer}
            title="チケットを編集する"
            onClose={() => setOpenEditDrawer(false)}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onDelete={async () => {
              if (clickedTicket) {
                await deleteTicket(clickedTicket.id)
                void refetchTickets()
              }
              setOpenEditDrawer(false)
            }}>
            <TicketForm ticket={clickedTicket} onClose={() => setOpenEditDrawer(false)} />
          </SidePanel>
          <SidePanel
            open={openCreateDrawer}
            title="チケットを作成する"
            onClose={() => setOpenCreateDrawer(false)}>
            <TicketForm onClose={() => setOpenCreateDrawer(false)} defaultStatus={targetStatus} />
          </SidePanel>
        </div>
      </Container>
    </Layout>
  )
}
