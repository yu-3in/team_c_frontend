import { useCallback, useState } from 'react'
import { Layout } from '../components/Layout/Layout'
import { TextField, Button, Alert, Snackbar } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { getUsers, signIn } from '../apis/user'
import { useQuery } from 'react-query'

type FormData = {
  email: string
  password: string
}

const Login = () => {
  const { control, handleSubmit } = useForm<FormData>()
  const navigate = useNavigate()
  const [isError, setIsError] = useState(false)
  const { data: user, isLoading } = useQuery('user', getUsers)

  const onSubmit: SubmitHandler<FormData> = useCallback((data) => {
    void signIn(data.email, data.password)
      .then((_) => navigate('/'))
      .catch((_) => {
        setIsError(true)
      })
  }, [])

  if (!isLoading && user) {
    navigate('/')
  }

  return (
    <Layout>
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-full max-w-xl rounded-md bg-[#ffffff] p-8">
          <div className="mt-3 flex w-full justify-center">
            <h1 className="text-3xl font-bold">ログイン</h1>
          </div>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form className="mx-auto mt-3 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-3 flex w-full flex-col gap-2">
              <label className="text-sm text-[#636366]">メールアドレス</label>
              <Controller
                name="email"
                control={control}
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
                    type="email"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <div className="mt-4 flex w-full flex-col gap-2">
              <label className="text-sm text-[#636366]">パスワード</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'パスワードを入力してください',
                  minLength: {
                    value: 8,
                    message: 'パスワードは8文字以上で入力してください',
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...field}
                    variant="outlined"
                    type="password"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <div className="mt-8 flex w-full flex-col items-center gap-3">
              <Button variant="contained" type="submit">
                ログイン
              </Button>
              <div className="mt-2 flex items-center justify-center text-sm text-[#636366]">
                <p>アカウントをお持ちでないですか？</p>
                <Link to={'/signup'} className="font-bold underline">
                  サインアップ
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={() => setIsError(false)}
        security="error"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="error">ログインに失敗しました</Alert>
      </Snackbar>
    </Layout>
  )
}

export default Login
