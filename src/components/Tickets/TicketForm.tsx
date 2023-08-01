import { Autocomplete, TextField, Button, FormHelperText } from '@mui/material'
import { Ticket } from '../../types/ticket'
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useCallback } from 'react'
import dayjs from 'dayjs'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'

type GenreOption = {
  id: number
  title: string
}

type UserOption = {
  id: number
  name: string
}

const genres: GenreOption[] = [
  {
    id: 1,
    title: 'ジャンル1',
  },
  {
    id: 2,
    title: 'ジャンル2',
  },
  {
    id: 3,
    title: 'ジャンル3',
  },
  {
    id: 4,
    title: 'ジャンル4',
  },
  {
    id: 5,
    title: 'ジャンル5',
  },
]

const users: UserOption[] = [
  {
    id: 1,
    name: 'ユーザー1',
  },
  {
    id: 2,
    name: 'ユーザー2',
  },
  {
    id: 3,
    name: 'ユーザー3',
  },
  {
    id: 4,
    name: 'ユーザー4',
  },
  {
    id: 5,
    name: 'ユーザー5',
  },
]

export type TicketFormProps = {
  ticket?: Ticket
}

export const TicketForm: React.FC<TicketFormProps> = ({ ticket }) => {
  const { control, handleSubmit, setValue } = useForm()

  const onSubmit: SubmitHandler<FieldValues> = useCallback((data) => {
    console.log(data)
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
            name="genre"
            control={control}
            defaultValue={ticket?.genre.title}
            rules={{ required: 'ジャンルを入力してください' }}
            render={({ fieldState }) => (
              <Autocomplete
                options={genres}
                defaultValue={ticket?.genre.title}
                getOptionLabel={(option: GenreOption | string) =>
                  typeof option === 'string' ? option : option.title
                }
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
                onChange={(_, value) =>
                  setValue('genre', value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              />
            )}
          />
        </div>
        <div className="flex w-full flex-col gap-1 px-3">
          <label className="font-bold text-gray-700">担当者</label>
          <Controller
            name="user"
            control={control}
            defaultValue={ticket?.user.name}
            rules={{ required: '担当者を入力してください' }}
            render={({ fieldState }) => (
              <Autocomplete
                options={users}
                defaultValue={ticket?.user.name}
                getOptionLabel={(option: UserOption | string) =>
                  typeof option === 'string' ? option : option.name
                }
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
                onChange={(_, value) =>
                  setValue('user', value, {
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
            defaultValue={dayjs(ticket?.dueDate)}
            rules={{
              validate: (value: string) => {
                const formatDate = dayjs(value).format('YYYY/MM/DD:HH:mm')
                if (!dayjs(formatDate).isValid()) {
                  return '日付形式が間違っています'
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
                validate: (value: string) => {
                  const formatDate = dayjs(value).format('YYYY/MM/DD')
                  if (!dayjs(formatDate).isValid()) {
                    return '日付形式が間違っています'
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
              defaultValue={dayjs(ticket?.endAt)}
              rules={{
                validate: (value: string) => {
                  const formatDate = dayjs(value).format('YYYY/MM/DD')
                  if (!dayjs(formatDate).isValid()) {
                    return '日付形式が間違っています'
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
