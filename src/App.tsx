import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import { Tickets } from './pages/tickets'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tickets" element={<Tickets />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
