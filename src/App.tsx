import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import Calendar from './pages/Calendar'
import { Tickets } from './pages/tickets'
import Profile from './pages/Profile'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ja from 'dayjs/locale/ja'

const App = () => {
  console.log(ja.name)

  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={ja.name}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </LocalizationProvider>
    </BrowserRouter>
  )
}

export default App
