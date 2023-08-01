import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import Calender from './pages/Calender'
import { Tickets } from './pages/tickets'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="tickets" element={<Tickets />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
