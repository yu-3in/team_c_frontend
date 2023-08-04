import { useQuery } from 'react-query'
import { UpdateMeRequest, getMe, updateMe, updateUsersGenres } from '../../apis/user'
import {
  Autocomplete,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  InputAdornment,
  TextField,
} from '@mui/material'
import WysiwygIcon from '@mui/icons-material/Wysiwyg'
import ApartmentIcon from '@mui/icons-material/Apartment'
import CategoryIcon from '@mui/icons-material/Category'
import React, { useCallback } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { getGenres } from '../../apis/genre'
import SearchIcon from '@mui/icons-material/Search'

type FormData = {
  name: string
  email: string
  genreIds?: number
  departmentName?: string | undefined
  productName?: string | undefined
}

export const ProfileSideBar: React.FC = () => {
  const { control, handleSubmit, reset, setValue } = useForm<FormData>()
  const { data: user, refetch } = useQuery(['user'], getMe)
  const { data: genres } = useQuery(['genres'], getGenres)
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<FormData> = useCallback((data) => {
    const req: UpdateMeRequest = {
      name: data.name,
      email: data.email,
      departmentName: data.departmentName,
      productName: data.productName,
    }
    void updateMe(req).then((_) => {
      void updateUsersGenres(data.genreIds ? [data.genreIds] : []).then(() => {
        void refetch()
        handleClose()
        reset()
      })
    })
  }, [])

  return (
    <>
      <div className="flex justify-center">
        <Avatar sx={{ bgcolor: user?.iconColor, width: 100, height: 100, fontSize: '3em' }}>
          {user?.name ? user.name.charAt(0) : ''}
        </Avatar>
      </div>
      <h1 className="my-5 pb-4 text-center text-2xl font-bold">{user?.name}</h1>
      <ul className="space-y-3">
        <Divider />
        <li className="flex flex-col gap-2">
          <div className="flex items-center gap-2  text-gray-700">
            <ApartmentIcon />
            <h2 className="text-lg font-bold">メールアドレス</h2>
          </div>
          <p className="pl-3">{user?.email ?? '未設定'}</p>
        </li>
        <Divider />
        <li className="flex flex-col gap-2">
          <div className="flex items-center gap-2  text-gray-700">
            <ApartmentIcon />
            <h2 className="text-lg font-bold">部署</h2>
          </div>
          <p className="pl-3">{user?.departmentName ?? '未設定'}</p>
        </li>
        <Divider />
        <li className="flex flex-col gap-2">
          <div className="flex items-center gap-2  text-gray-700">
            <WysiwygIcon />
            <h2 className="text-lg font-bold">プロダクト</h2>
          </div>
          <p className="pl-3">{user?.productName ?? '未設定'}</p>
        </li>
        <Divider />
        <li className="flex flex-col gap-2">
          <div className="flex items-center gap-2  text-gray-700">
            <CategoryIcon />
            <h2 className="text-lg font-bold">注力ジャンル</h2>
          </div>
          <ul className="pl-3">
            {user?.genres && user.genres.length > 0 ? (
              <>
                {user?.genres.map((genre) => (
                  <li key={genre.id}>{genre.title}</li>
                ))}
              </>
            ) : (
              '未設定'
            )}
          </ul>
        </li>
        <div className="flex justify-center pt-4">
          <Button variant="contained" onClick={handleClickOpen}>
            プロフィールを編集
          </Button>
        </div>
      </ul>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth>
        <DialogTitle id="alert-dialog-title">プロフィールを編集する</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div className="flex w-full flex-col gap-1 px-3">
                  <label className="font-bold text-gray-700">ユーザー名</label>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={user?.name}
                    rules={{ required: 'ユーザー名を入力してください' }}
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
                  <label className="font-bold text-gray-700">メールアドレス</label>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={user?.email}
                    rules={{
                      required: 'メールアドレスを入力してください',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'メールアドレスの形式が正しくありません',
                      },
                    }}
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
                  <label className="font-bold text-gray-700">所属</label>
                  <Controller
                    name="departmentName"
                    control={control}
                    defaultValue={user?.departmentName}
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
                  <label className="font-bold text-gray-700">プロダクト名</label>
                  <Controller
                    name="productName"
                    control={control}
                    defaultValue={user?.productName}
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
                  <label className="font-bold text-gray-700">ジャンル</label>
                  <Controller
                    name="genreIds"
                    control={control}
                    defaultValue={
                      user?.genres && user.genres.length > 0 ? user.genres[0].id : undefined
                    }
                    rules={{ required: 'ジャンルを選択してください' }}
                    render={({ fieldState }) => (
                      <Autocomplete
                        options={genres?.map((genre) => genre.id) ?? []}
                        defaultValue={
                          user?.genres && user.genres.length > 0 ? user.genres[0].id : undefined
                        }
                        getOptionLabel={(option) => {
                          return genres?.find((genre) => genre.id === option)?.title ?? ''
                        }}
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
                          setValue('genreIds', value ?? undefined, {
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-center gap-8">
                <Button variant="outlined" type="button" onClick={handleClose}>
                  キャンセル
                </Button>
                <Button variant="contained" type="submit">
                  保存
                </Button>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}
