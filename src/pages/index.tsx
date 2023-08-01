// import { Button } from '../components/Button/Button'
import { Layout } from '../components/Layout/Layout'
import { SidePanel } from '../components/Panel/SidePanel'
import { useState } from 'react'
import { IconButton, Input, Textarea, Typography } from '@material-tailwind/react'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'
import styles from '../styles/home.module.css'

export const Home: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <Layout>
      <SidePanel open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            Contact Us
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={() => setOpenDrawer(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>
        </div>
        <form className="flex flex-col gap-6 p-4">
          <Input type="email" label="Email" />
          <Input label="Subject" />
          <Textarea rows={6} label="Message" />
          <button>Send Message</button>
        </form>
      </SidePanel>

      <div className={styles.body}>
        <div className={styles.calender}>
          <FullCalendar
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
        <div className={styles.tickets}>
          <button onClick={() => setOpenDrawer(true)}>Open Drawer</button>
          <div className={styles.area}></div>
          <div className={styles.area}></div>
        </div>
      </div>
    </Layout>
  )
}
