import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'
import styles from '../styles/calendar.module.css'
import { Layout } from '../components/Layout/Layout'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { User } from '../types/user'
import { getUsers } from '../apis/user'
import { Ticket } from '../types/ticket'
import '../styles/calendar-global.css'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { SidePanel } from '../components/Panel/SidePanel'
import { TicketForm } from '../components/Tickets/TicketForm'
import { Status } from '../types/status'
import { deleteTicket, getTickets } from '../apis/ticket'

type EventType = {
  id: string
  title: string
  start: string | undefined
  end: string | undefined
}

const Calendar = () => {
  const [events, setEvents] = useState<EventType[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const [clickedTicket, setClickedTicket] = useState<Ticket>()
  const [targetStatus] = useState<Status>()

  const getUsersQuery = useQuery(['users'], () => getUsers(), {
    onSuccess: (res) => setUsers(res),
  })

  const getTicketsQuery = useQuery(['tickets'], () => getTickets(), {
    onSuccess: (res) => {
      const tickets: EventType[] = res.map((ticket) => {
        return {
          id: String(ticket.id),
          title: ticket.title,
          start: ticket.startAt,
          end: ticket.endAt,
        }
      })

      setEvents(tickets)
      setTickets(res)
    },
  })

  const handleClickTicketCard = (id: string) => {
    console.log(id)
    const obj = tickets.find((ticket) => ticket.id === Number(id))
    setOpenEditDrawer(true)
    setClickedTicket(obj)
  }

  if (getUsersQuery.isLoading) return <>ロード中</>
  if (getTicketsQuery.isLoading) return <>チケットデータをロード中</>

  return (
    <Layout>
      <div className={styles.contents}>
        <div className={styles.wrapper}>
          <div className={styles.side}>
            <Button
              variant="contained"
              color="info"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateDrawer(true)}>
              作成する
            </Button>
            <div className={styles.userHeading}>
              <h1>ユーザーリスト</h1>
            </div>
            <div className={styles.userList}>
              {users.map((user) => (
                <Link to="/profile" key={user.id}>
                  <div className={styles.userData}>
                    <div className={styles.iconArea}></div>
                    <div className={styles.content}>
                      <p className={styles.name}>{user.name}</p>
                      <p className={styles.pos}>{user.email}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.calendar}>
            <FullCalendar
              height="100%"
              plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              locales={[jaLocale]}
              locale="ja"
              headerToolbar={{
                left: 'dayGridMonth,timeGridWeek,timeGridDay',
                center: '',
                right: 'prev,next',
              }}
              events={events}
              eventClick={(arg) => {
                handleClickTicketCard(arg.event.id)
              }}
            />
          </div>
        </div>
      </div>
      <SidePanel
        open={openCreateDrawer}
        title="チケットを作成する"
        onClose={() => setOpenCreateDrawer(false)}>
        <TicketForm onClose={() => setOpenCreateDrawer(false)} defaultStatus={targetStatus} />
      </SidePanel>
      <SidePanel
        open={openEditDrawer}
        title="チケットを編集する"
        onClose={() => setOpenEditDrawer(false)}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onDelete={async () => {
          if (clickedTicket) {
            await deleteTicket(clickedTicket.id)
            void getTicketsQuery.refetch()
          }
          setOpenEditDrawer(false)
        }}>
        <TicketForm ticket={clickedTicket} onClose={() => setOpenEditDrawer(false)} />
      </SidePanel>
    </Layout>
  )
}

export default Calendar
