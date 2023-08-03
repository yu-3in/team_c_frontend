import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'
import styles from '../styles/calendar.module.css'
import { Layout } from '../components/Layout/Layout'
import { useQuery } from 'react-query'
import { getMe, getUsers } from '../apis/user'
import { Ticket } from '../types/ticket'
import '../styles/calendar-global.css'
import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { SidePanel } from '../components/Panel/SidePanel'
import { TicketForm } from '../components/Tickets/TicketForm'
import { Status } from '../types/status'
import { deleteTicket, getTickets } from '../apis/ticket'
import PersonIcon from '@mui/icons-material/Person'

type EventType = {
  id: string
  title: string
  start: string | undefined
  end: string | undefined
  userId?: number
}

const Calendar = () => {
  const [events, setEvents] = useState<EventType[]>([])
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const [clickedTicket, setClickedTicket] = useState<Ticket>()
  const [targetStatus] = useState<Status>()
  const [isFirst, setIsFirst] = useState(true)

  const { data: me } = useQuery(['user'], getMe)
  const { data: users } = useQuery(['users'], getUsers)
  const { data: tickets, refetch: refetchTickets } = useQuery(['tickets'], () => getTickets())

  const [checked, setChecked] = useState<number[]>([])

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  useEffect(() => {
    if (isFirst && me?.id) {
      setIsFirst(false)
      setChecked([me.id])
    }
  }, [me?.id])

  useEffect(() => {
    const events: EventType[] =
      tickets?.map((ticket) => {
        return {
          id: String(ticket.id),
          title: ticket.title,
          start: ticket.startAt,
          end: ticket.endAt,
          userId: ticket.User?.id,
        }
      }) ?? []

    setEvents(
      events.filter((event) => {
        if (checked.indexOf(Number(event.userId)) !== -1) {
          return true
        }

        return false
      })
    )
  }, [checked, tickets])

  const handleClickTicketCard = (id: string) => {
    console.log(id)
    const obj = tickets?.find((ticket) => ticket.id === Number(id))
    setOpenEditDrawer(true)
    setClickedTicket(obj)
    void refetchTickets()
  }

  return (
    <Layout>
      <div className={styles.contents}>
        <div className={styles.wrapper}>
          <div className="relative pl-4 pt-5">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateDrawer(true)}>
              作成する
            </Button>
            <h1 className="sticky top-0 -ml-4 mt-8 flex items-center gap-2 bg-inherit py-2 text-xl font-bold text-gray-700">
              <PersonIcon />
              チームメンバー
            </h1>
            <div className="max-h-[58vh] w-[280px] overflow-y-auto">
              <List sx={{ width: '100%', ml: -2 }}>
                {users?.map((user) => {
                  const labelId = `checkbox-list-label-${user.id}`

                  return (
                    <ListItem key={user.id} disablePadding>
                      <ListItemButton role={undefined} onClick={handleToggle(user.id)} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(user.id) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={user.name} secondary={user.email} />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
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
            void refetchTickets()
          }
          setOpenEditDrawer(false)
        }}>
        <TicketForm ticket={clickedTicket} onClose={() => setOpenEditDrawer(false)} />
      </SidePanel>
    </Layout>
  )
}

export default Calendar
