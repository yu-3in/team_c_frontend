import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import Calendar from './pages/Calendar'
import { Tickets } from './pages/tickets'
import Profile from './pages/Profile'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ja from 'dayjs/locale/ja'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AuthWrapper from './components/Auth/AuthWrapper'
import { QueryClient, QueryClientProvider } from 'react-query'
import appTheme from './styles/mui-global'
import { ThemeProvider } from '@mui/material'

const App = () => {
  const queryClient = new QueryClient()

  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ja.name}>
            <Routes>
              <Route
                path="/"
                element={
                  <AuthWrapper>
                    <Home />
                  </AuthWrapper>
                }
              />
              <Route
                path="/calendar"
                element={
                  <AuthWrapper>
                    <Calendar />
                  </AuthWrapper>
                }
              />
              <Route
                path="tickets"
                element={
                  <AuthWrapper>
                    <Tickets />
                  </AuthWrapper>
                }
              />
              <Route
                path="profile"
                element={
                  <AuthWrapper>
                    <Profile />
                  </AuthWrapper>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Routes>
          </LocalizationProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
