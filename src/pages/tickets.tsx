import { Autocomplete, Button, Container, TextField } from '@mui/material'
import { Layout } from '../components/Layout/Layout'
import { TicketList } from '../components/Tickets/TicketList'
import { Ticket } from '../types/ticket'
import { useState, useCallback, useEffect } from 'react'
import { SidePanel } from '../components/Panel/SidePanel'
import { TicketForm } from '../components/Tickets/TicketForm'
import { useQuery } from 'react-query'
import { deleteTicket, getTickets } from '../apis/ticket'
import { Status } from '../types/status'
import AddIcon from '@mui/icons-material/Add'
import { Sort } from '../types/sort'
import { getGenres } from '../apis/genre'
import { getUsers } from '../apis/user'

const sorts: { label: string; value: Sort }[] = [
  {
    label: 'おすすめ',
    value: 'recommended',
  },
  {
    label: '作成日が新しい順',
    value: 'latest_creation',
  },
  {
    label: '作成日が古い順',
    value: 'oldest_creation',
  },
  {
    label: '更新日が新しい順',
    value: 'latest_update',
  },
  {
    label: '更新日が古い順',
    value: 'oldest_update',
  },
]

export const Tickets: React.FC = () => {
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const [clickedTicket, setClickedTicket] = useState<Ticket>()
  const [targetStatus, setTargetStatus] = useState<Status>()
  const [sort, setSort] = useState<Sort>('recommended')
  const [userId, setUserId] = useState<number>()
  const [genreId, setGenreId] = useState<number>()
  const { data: ticketsMeta } = useQuery(['tickets'], () => getTickets())
  const {
    data: tickets,
    refetch: refetchTickets,
    isFetching: isFetchingTickets,
  } = useQuery(['tickets', sort, userId, genreId], () => getTickets(sort, userId, genreId))
  const { data: genres } = useQuery(['genres'], getGenres)
  const { data: users } = useQuery(['users'], getUsers)

  useEffect(() => {
    void refetchTickets().then(() => {
      //
    })
  }, [sort, userId, genreId, ticketsMeta])

  const handleClickTicketCard = useCallback((ticket: Ticket) => {
    setOpenEditDrawer(true)
    setClickedTicket(ticket)
  }, [])

  return (
    <Layout>
      <Container maxWidth="xl">
        <div className="px-8">
          <div className="mb-4 flex justify-end gap-2">
            <Autocomplete
              options={users?.map((user) => user.id.toString()) ?? []}
              defaultValue={''}
              getOptionLabel={(option) =>
                users?.find((user) => user.id.toString() === option)?.name ?? ''
              }
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label="担当者"
                  size="small"
                  sx={{
                    width: '200px',
                  }}
                />
              )}
              onChange={(_, value) => {
                setUserId(Number(value))
              }}
            />
            <Autocomplete
              options={genres?.map((genre) => genre.id.toString()) ?? []}
              defaultValue={''}
              getOptionLabel={(option) =>
                genres?.find((genre) => genre.id.toString() === option)?.title ?? ''
              }
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label="ジャンル"
                  size="small"
                  sx={{
                    width: '200px',
                  }}
                />
              )}
              onChange={(_, value) => {
                setGenreId(Number(value))
              }}
            />
            <Autocomplete
              options={sorts.map((sort) => sort.value)}
              defaultValue={''}
              getOptionLabel={(option) =>
                sorts?.find((sort) => sort.value.toString() === option)?.label ?? ''
              }
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label="ソート"
                  size="small"
                  sx={{
                    width: '200px',
                  }}
                />
              )}
              onChange={(_, value) => {
                setSort((value as Sort) ?? 'recommended')
              }}
            />
            <Button
              variant="contained"
              color="info"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateDrawer(true)}>
              作成する
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="flex w-full gap-4 overflow-x-auto pb-2">
              {['todo', 'doing', 'done'].map((status) => (
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
                    className="h-[75vh] min-w-[400px] overflow-y-auto"
                  />
                </div>
              ))}
            </div>
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
      </Container>
    </Layout>
  )
}
