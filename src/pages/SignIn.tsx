import React from 'react'
// import { Layout } from '../components/Layout/Layout'
// import { TextField, Button } from '@mui/material'
// import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
// import { useCallback } from 'react'

const SignIn = () => {
  // const { control, handleSubmit } = useForm()
  // const onSubmit: SubmitHandler<FieldValues> = useCallback((data) => {
  //   console.log(data)
  //   alert(data.email)
  // }, [])

  return (
    <>
      {/* <Layout>
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-full max-w-xl rounded-md bg-[#ffffff] p-8">
            <div className="mt-3 flex flex-col w-full justify-center items-center">
              <h1 className="text-3xl font-bold">サインイン</h1>
              <p className='mt-2 text-[#636366]'>サービス名のアカウントを作成する。</p>
            </div>
            <form className="mx-auto mt-3 w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4 flex w-full flex-col gap-2">
                <label className="text-sm text-[#636366]">ユーザー名</label>
                <Controller
                  name="userName"
                  control={control}
                  defaultValue={''}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </div>
              <div className="mt-4 flex w-full flex-col gap-2">
                <label className="text-sm text-[#636366]">メールアドレス</label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={''}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      variant="outlined"
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
                  defaultValue={''}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </div>
              <div className="mt-8 flex w-full flex-col items-center gap-3">
                <Button variant="contained" type="submit">
                  サインイン
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Layout> */}
    </>
  )
}

export default SignIn
