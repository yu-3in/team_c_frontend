import {
  Autocomplete,
  TextField,
  Button,
  FormHelperText,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material'
import { Ticket } from '../../types/ticket'
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useCallback } from 'react'
import dayjs from 'dayjs'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'
import { statusConfig } from '../../configs/status'
import SearchIcon from '@mui/icons-material/Search'
import { TicketRequest, createTicket, updateTicket } from '../../apis/ticket'
import { getUsers } from '../../apis/user'
import { getGenres } from '../../apis/genre'
import { useQuery } from 'react-query'

type FormData = {
  title: string
  description: string
  genreId: number
  status: string
  userId?: number
  dueDate?: dayjs.Dayjs
  startAt?: dayjs.Dayjs
  endAt?: dayjs.Dayjs
}

export type TicketFormProps = {
  ticket?: Ticket
  onClose?: () => void
}

export const TicketForm: React.FC<TicketFormProps> = ({ ticket, onClose }) => {
  const { control, handleSubmit, setValue, reset } = useForm<FormData>()
  const { data: users } = useQuery(['users'], getUsers)
  const { data: genres } = useQuery(['genres'], getGenres)

  const onSubmit: SubmitHandler<FormData> = useCallback((data) => {
    const req: TicketRequest = {
      title: data.title,
      description: data.description,
      genreId: data.genreId,
      status: data.status,
      userId: data.userId,
      dueDate: dayjs(data.dueDate).toISOString(),
      startAt: dayjs(data.startAt).toISOString(),
      endAt: dayjs(data.endAt).toISOString(),
    }
    if (ticket) {
      // update
      void updateTicket(ticket.id, req).then((_) => {
        onClose && onClose()
        reset()
      })
    } else {
      // create
      void createTicket(req).then((_) => {
        onClose && onClose()
        reset()
      })
    }
  }, [])

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="mx-auto w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div className="flex w-full flex-col gap-1 px-3">
          <label className="font-bold text-gray-700">タイトル</label>
          <Controller
            name="title"
            control={control}
            defaultValue={ticket?.title}
            rules={{ required: 'タイトルを入力してください' }}
            render={({ field, fieldState }) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...field}
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </div>
        <div className="flex w-full flex-col gap-1 px-3">
          <label className="font-bold text-gray-700">概要</label>
          <Controller
            name="description"
            control={control}
            defaultValue={ticket?.description}
            rules={{ required: '概要を入力してください' }}
            render={({ field, fieldState }) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...field}
                variant="outlined"
                minRows={3}
                maxRows={5}
                multiline
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </div>
        <div className="flex w-full flex-col gap-1 px-3">
          <label className="font-bold text-gray-700">ジャンル</label>
          <Controller
            name="genreId"
            control={control}
            defaultValue={ticket?.Genre?.id}
            rules={{ required: 'ジャンルを選択してください' }}
            render={({ fieldState }) => (
              <Autocomplete
                options={genres?.map((genre) => genre.id) ?? []}
                defaultValue={ticket?.Genre?.id}
                getOptionLabel={(option) =>
                  genres?.find((genre) => genre.id === option)?.title ?? ''
                }
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
                onChange={(_, value) => {
                  if (value) {
                    setValue('genreId', value ?? undefined, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                }}
              />
            )}
          />
        </div>
        <div className="flex w-full flex-col gap-1 px-3">
          <label className="font-bold text-gray-700">ステータス</label>
          <Controller
            name="status"
            control={control}
            defaultValue={ticket?.status ?? 'todo'}
            rules={{ required: 'ステータスを選択してください' }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...field}
                  error={!!fieldState.error}
                  onChange={(event) => {
                    setValue('status', event.target.value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }}>
                  {Object.entries(statusConfig).map(([key, value]) => (
                    <MenuItem key={key} value={key} defaultChecked={ticket?.status === key}>
                      {value.title}
                    </MenuItem>
                  ))}
                </Select>
                {fieldState.error && (
                  <FormHelperText error sx={{ pl: 2 }}>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </div>
        <div className="flex w-full flex-col gap-1 px-3">
          <label className="font-bold text-gray-700">担当者</label>
          <Controller
            name="userId"
            control={control}
            defaultValue={ticket?.User?.id}
            rules={{ required: '担当者を選択してください' }}
            render={({ fieldState }) => (
              <Autocomplete
                options={users?.map((user) => user.id) ?? []}
                defaultValue={ticket?.User?.id}
                getOptionLabel={(option) => users?.find((user) => user.id === option)?.name ?? ''}
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
                onChange={(_, value) =>
                  setValue('userId', value ?? undefined, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              />
            )}
          />
        </div>
        <div className="flex w-full flex-col gap-1 px-3">
          <label className="font-bold text-gray-700">期限</label>
          <Controller
            name="dueDate"
            control={control}
            defaultValue={ticket?.dueDate ? dayjs(ticket.dueDate) : undefined}
            rules={{
              validate: (value) => {
                if (value) {
                  const formatDate = value ? value.toISOString() : null
                  if (!dayjs(formatDate).isValid()) {
                    return '日付形式が間違っています'
                  }
                }
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <DateTimePicker
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...field}
                  format="YYYY/MM/DD  HH:mm"
                  formatDensity="spacious"
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: null,
                  }}
                  ampm={false}
                />
                {fieldState.error && (
                  <FormHelperText error sx={{ pl: 2 }}>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </div>
        <div className="grid grid-cols-2">
          <div className="flex w-full flex-col gap-1 px-3">
            <label className="font-bold text-gray-700">開始日</label>
            <Controller
              name="startAt"
              control={control}
              defaultValue={dayjs(ticket?.startAt)}
              rules={{
                validate: (value) => {
                  if (value) {
                    const formatDate = value ? value.toISOString() : null
                    if (!dayjs(formatDate).isValid()) {
                      return '日付形式が間違っています'
                    }
                  }
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <DatePicker
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...field}
                    format="YYYY/MM/DD"
                    formatDensity="spacious"
                  />
                  {fieldState.error && (
                    <FormHelperText error sx={{ pl: 2 }}>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </div>
          <div className="flex w-full flex-col gap-1 px-3">
            <label className="font-bold text-gray-700">終了日</label>
            <Controller
              name="endAt"
              control={control}
              defaultValue={ticket?.endAt ? dayjs(ticket.endAt) : undefined}
              rules={{
                validate: (value) => {
                  if (value) {
                    const formatDate = value ? value.toISOString() : null
                    if (!dayjs(formatDate).isValid()) {
                      return '日付形式が間違っています'
                    }
                  }
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <DatePicker
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...field}
                    format="YYYY/MM/DD"
                    formatDensity="spacious"
                  />
                  {fieldState.error && (
                    <FormHelperText error sx={{ pl: 2 }}>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </div>
        </div>
        <div className="flex w-full justify-center gap-16">
          <Button variant="outlined" type="button">
            キャンセル
          </Button>
          <Button variant="contained" type="submit">
            保存
          </Button>
        </div>
      </div>
    </form>
  )
}
