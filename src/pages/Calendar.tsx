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
// import { Ticket } from '../types/ticket'
import { User } from '../types/user'
import { getUsers } from '../apis/user'

import '../styles/calendar-global.css'

type eventType = {
  title: string
  start: Date | null
  end: Date | null
}

const Calendar = () => {
  // ユーザーのサンプルデータ
  const userSample = [
    { name: '名前 なまえ', pos: 'GMOインターネット', id: 1 },
    { name: '名前 なまえ', pos: 'GMOインターネット', id: 2 },
  ]
  // チケットのサンプルデータ
  const eventSample = [
    { title: '要件定義書を作成', start: '2023-08-01T10:00:00', end: '2023-08-01T14:00:00' },
  ]

  // const [tickets, setTickets] = useState<Ticket[]>([])
  const [users, setUsers] = useState<User[]>([])

  const getUsersQuery = useQuery(['users'], () => getUsers(), {
    onSuccess: (res) => setUsers(res),
  })

  console.log(users)

  // チケットをクリックしたとき
  const handleClick = (event: eventType) => {
    alert(event.title)
  }

  if (getUsersQuery.isLoading) return <></>

  return (
    <Layout>
      <div className={styles.contents}>
        <div className={styles.wrapper}>
          <div className={styles.side}>
            <button onClick={() => console.log()}>チケット作成</button>
            <div className={styles.userHeading}>
              <h1>ユーザーリスト</h1>
            </div>
            <div className={styles.userList}>
              {userSample.map((user) => (
                <Link to="/user" key={user.id}>
                  <div className={styles.userData}>
                    <div className={styles.iconArea}></div>
                    <div className={styles.content}>
                      <p className={styles.name}>{user.name}</p>
                      <p className={styles.pos}>{user.pos}</p>
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
              events={eventSample}
              eventClick={(arg) =>
                handleClick({
                  title: arg.event.title,
                  start: arg.event.start,
                  end: arg.event.end,
                })
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Calendar
