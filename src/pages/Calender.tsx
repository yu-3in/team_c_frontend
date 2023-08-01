import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'
import styles from '../styles/calender.module.css'
import { Layout } from '../components/Layout/Layout'

type eventType = {
  title: string
  start: Date | null
  end: Date | null
}

const Calender = () => {
  const eventSample = [
    { title: '要件定義書を作成', start: '2023-08-01T10:00:00', end: '2023-08-01T14:00:00' },
    { title: 'hoge', start: '2023-08-02T10:00:00', end: '2023-08-02T16:00:00' },
  ]

  // チケットクリック
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
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          locales={[jaLocale]}
          locale="ja"
          headerToolbar={{
            left: 'dayGridMonth,timeGridWeek',
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

      {/* 作成ボタン */}
      <button onClick={createTicket}>作成</button>
    </Layout>
  )
}

export default Calender
