import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'

const Calender = () => {
  const eventSample = [
    { title: '要件定義書を作成', start: '2023-08-01T10:00:00', end: '2023-08-01T14:00:00' },
    { title: 'hoge', start: '2023-08-02T10:00:00', end: '2023-08-02T16:00:00' },
  ]

  // クリック

  return (
    <>
      <div>
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin]}
          initialView="timeGridWeek"
          locales={[jaLocale]}
          locale="ja"
          headerToolbar={{
            left: 'dayGridMonth,timeGridWeek',
            center: '',
            right: 'prev,next',
          }}
          events={eventSample}
        />
      </div>
    </>
  )
}

export default Calender
