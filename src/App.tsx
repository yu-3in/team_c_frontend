import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import Calendar from './pages/Calendar'
import { Tickets } from './pages/tickets'
import Profile from './pages/Profile'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
