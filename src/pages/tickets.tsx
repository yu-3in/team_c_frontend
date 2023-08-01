import { Container } from '@mui/material'
import { Layout } from '../components/Layout/Layout'
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
]

export const Tickets: React.FC = () => {
  return (
    <Layout>
      <Container>
        <div>
          <TicketList tickets={tickets} status="todo" />
        </div>
      </Container>
    </Layout>
  )
}
