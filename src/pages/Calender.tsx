import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'
import styles from '../styles/calender.module.css'
import { Layout } from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

type eventType = {
  title: string
  start: Date | null
  end: Date | null
}

const Calender = () => {
  // ユーザーのサンプルデータ
  const userSample = [
    { name: '名前 なまえ', pos: 'GMOインターネット', id: 1 },
    { name: '名前 なまえ', pos: 'GMOインターネット', id: 2 },
    { name: '名前 なまえ', pos: 'GMOインターネット', id: 3 },
    { name: '名前 なまえ', pos: 'GMOインターネット', id: 4 },
  ]

  // チケットのサンプルデータ
  const eventSample = [
    { title: '要件定義書を作成', start: '2023-08-01T10:00:00', end: '2023-08-01T14:00:00' },
    { title: 'hoge', start: '2023-08-02T10:00:00', end: '2023-08-02T16:00:00' },
    { title: 'hoge', start: '2023-08-03T10:00:00', end: '2023-08-03T16:00:00' },
    { title: 'hoge', start: '2023-08-04T10:00:00', end: '2023-08-04T16:00:00' },
  ]

  // チケットをクリックしたとき
  const handleClick = (event: eventType) => {
    alert(event.title)
  }

  // チケット作成
  const createTicket = () => {
    alert()
  }

  return (
    <Layout>
      <div className={styles.body}>
        <div className={styles.side}>
          <button onClick={createTicket}>チケット作成</button>
          <div className={styles.userList}>
            <div className={styles.userHeading}>
              <h1>ユーザーリスト</h1>
            </div>
            {userSample.map((user) => (
              <Link to="/user" className={styles.userData} key={user.id}>
                <div className={styles.iconArea}></div>
                <div className={styles.contents}>
                  <p className={styles.name}>{user.name}</p>
                  <p className={styles.pos}>{user.pos}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.calender}>
          <FullCalendar
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
    </Layout>
  )
}

export default Calender
