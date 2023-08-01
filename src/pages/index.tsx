// import { Button } from '../components/Button/Button'
import { Layout } from '../components/Layout/Layout'
import { SidePanel } from '../components/Panel/SidePanel'
import { useCallback, useState } from 'react'
import { IconButton, Input, Textarea, Typography } from '@material-tailwind/react'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import jaLocale from '@fullcalendar/core/locales/ja'
import styles from '../styles/home.module.css'
import { Container } from '@mui/material'
import { TicketList } from '../components/Tickets/TicketList'
import { Ticket } from '../types/ticket'

const tickets: Ticket[] = [
  {
    id: 1,
    title: 'チケット1',
    description: 'チケット1の説明',
    status: 'todo',
    dueDate: '2021-10-01',
    startAt: '2021-10-01',
    endAt: '2021-10-01',
    user: {
      id: 1,
      name: 'ユーザー1',
      email: 'example@test.com',
      genres: [
        {
          id: 1,
          title: 'ジャンル1',
          createdAt: '2021-10-01',
          updatedAt: '2021-10-01',
          color: '#07C3DD',
        },
        {
          id: 2,
          title: 'ジャンル2',
          createdAt: '2021-10-01',
          updatedAt: '2021-10-01',
          color: '#07C3DD',
        },
      ],
      createdAt: '2021-10-01',
      updatedAt: '2021-10-01',
    },
    genre: {
      id: 1,
      title: 'ジャンル1',
      createdAt: '2021-10-01',
      updatedAt: '2021-10-01',
      color: '#07C3DD',
    },
    createdAt: '2021-10-01',
    updatedAt: '2021-10-01',
  },
  {
    id: 1,
    title: 'チケット1',
    description: 'チケット1の説明',
    status: 'doing',
    dueDate: '2021-10-01',
    startAt: '2021-10-01',
    endAt: '2021-10-01',
    user: {
      id: 1,
      name: 'ユーザー1',
      email: 'example@test.com',
      genres: [
        {
          id: 1,
          title: 'ジャンル1',
          createdAt: '2021-10-01',
          updatedAt: '2021-10-01',
          color: '#07C3DD',
        },
        {
          id: 2,
          title: 'ジャンル2',
          createdAt: '2021-10-01',
          updatedAt: '2021-10-01',
          color: '#07C3DD',
        },
      ],
      createdAt: '2021-10-01',
      updatedAt: '2021-10-01',
    },
    genre: {
      id: 1,
      title: 'ジャンル1',
      createdAt: '2021-10-01',
      updatedAt: '2021-10-01',
      color: '#07C3DD',
    },
    createdAt: '2021-10-01',
    updatedAt: '2021-10-01',
  },
  {
    id: 1,
    title: 'チケット1',
    description: 'チケット1の説明',
    status: 'done',
    dueDate: '2021-10-01',
    startAt: '2021-10-01',
    endAt: '2021-10-01',
    user: {
      id: 1,
      name: 'ユーザー1',
      email: 'example@test.com',
      genres: [
        {
          id: 1,
          title: 'ジャンル1',
          createdAt: '2021-10-01',
          updatedAt: '2021-10-01',
          color: '#07C3DD',
        },
        {
          id: 2,
          title: 'ジャンル2',
          createdAt: '2021-10-01',
          updatedAt: '2021-10-01',
          color: '#07C3DD',
        },
      ],
      createdAt: '2021-10-01',
      updatedAt: '2021-10-01',
    },
    genre: {
      id: 1,
      title: 'ジャンル1',
      createdAt: '2021-10-01',
      updatedAt: '2021-10-01',
      color: '#07C3DD',
    },
    createdAt: '2021-10-01',
    updatedAt: '2021-10-01',
  },
]

export const Home: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleClickTicketCard = useCallback(() => {
    setOpenDrawer(true)
  }, [])

  return (
    <Layout>
      <Container maxWidth="xl">
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
            <div className="flex flex-col items-center gap-4">
              <div className="w-full">
                <TicketList tickets={tickets} status="doing" onClick={handleClickTicketCard} />
              </div>
              <div className="w-full">
                <TicketList tickets={tickets} status="todo" onClick={handleClickTicketCard} />
              </div>
            </div>

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
          </div>
        </div>
      </Container>
    </Layout>
  )
}
