import { Layout } from '../components/Layout/Layout'
import { SidePanel } from '../components/Panel/SidePanel'
import { useCallback, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'
import styles from '../styles/home.module.css'
import { TicketList } from '../components/Tickets/TicketList'
import { Ticket } from '../types/ticket'
import { TicketForm } from '../components/Tickets/TicketForm'
import { useQuery } from 'react-query'
import { deleteTicket, getTickets } from '../apis/ticket'
import { Status } from '../types/status'
import { getMe } from '../apis/user'

export const Home: React.FC = () => {
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const [clickedTicket, setClickedTicket] = useState<Ticket>()
  const [targetStatus, setTargetStatus] = useState<Status>()
  const { data: user } = useQuery(['user'], () => getMe())
  const {
    data: tickets,
    isFetching: isFetchingTickets,
    refetch: refetchTickets,
  } = useQuery(['tickets', user], () => getTickets(undefined, user?.id))

  const handleClickTicketCard = useCallback((ticket: Ticket) => {
    setOpenEditDrawer(true)
    setClickedTicket(ticket)
  }, [])

  return (
    <>
      <Layout>
        <div className={styles.body}>
          <div className={styles.tickets}>
            <div className="flex flex-col items-center gap-4">
              {['doing', 'todo', 'done'].map((status) => (
                <div className="w-full" key={status}>
                  <TicketList
                    tickets={tickets?.filter((ticket) => ticket.status === status) ?? []}
                    status={status as Status}
                    onClick={handleClickTicketCard}
                    noItemOnClick={() => {
                      setOpenCreateDrawer(true)
                      setTargetStatus(status as Status)
                    }}
                    isLoading={isFetchingTickets}
                    className="min-w-[350px]"
                  />
                </div>
              ))}
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

          <div className={styles.calendar}>
            <FullCalendar
              height="100%"
              plugins={[timeGridPlugin, interactionPlugin]}
              initialView="timeGridDay"
              locales={[jaLocale]}
              locale="ja"
              headerToolbar={{
                left: '',
                center: '',
                right: 'prev,next',
              }}
              events={[
                {
                  title: '要件定義書を作成',
                  start: '2023-08-01T10:00:00',
                  end: '2023-08-01T14:00:00',
                },
              ]}
            />
          </div>
        </div>
      </Layout>
    </>
  )
}
