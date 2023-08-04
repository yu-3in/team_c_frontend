import dayGridPlugin from '@fullcalendar/daygrid'
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

type EventType = {
  id: string
  title: string
  start: string | undefined
  end: string | undefined
  userId?: number
}

export const Home: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([])
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const [clickedTicket, setClickedTicket] = useState<Ticket>()
  const [targetStatus, setTargetStatus] = useState<Status>()
  const { data: user } = useQuery(['user'], () => getMe())

  const {
    data: tickets,
    isFetching: isFetchingTickets,
    refetch: refetchTickets,
  } = useQuery(['tickets', user], () => getTickets(undefined, user?.id), {
    onSuccess: (res) => {
      const hoge = res.map((ticket) => {
        return {
          id: String(ticket.id),
          title: ticket.title,
          start: ticket.startAt,
          end: ticket.endAt,
          userId: ticket.User?.id,
        }
      })
      setEvents(hoge)
    },
  })

  const handleClickTicketCard = useCallback((ticket: Ticket) => {
    setOpenEditDrawer(true)
    setClickedTicket(ticket)
  }, [])

  const handleClickEventCard = (id: string) => {
    console.log(id)
    const obj = tickets?.find((ticket) => ticket.id === Number(id))
    setOpenEditDrawer(true)
    setClickedTicket(obj)
    void refetchTickets()
  }

  return (
    <>
      <Layout>
        <div className={styles.body}>
          <div className={styles.tickets}>
            <div className="flex flex-col items-start gap-4">
              <div className="mb-1 ml-2 mt-4">
                <h1 className="text-2xl font-bold">マイチケット</h1>
              </div>
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
              plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
              initialView="timeGridDay"
              locales={[jaLocale]}
              locale="ja"
              headerToolbar={{
                left: 'dayGridMonth,timeGridWeek,timeGridDay',
                center: '',
                right: 'prev,next',
              }}
              events={events}
              eventClick={(arg) => {
                handleClickEventCard(arg.event.id)
              }}
            />
          </div>
        </div>
      </Layout>
    </>
  )
}
