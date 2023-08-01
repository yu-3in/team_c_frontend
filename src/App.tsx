import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages'
import Calender from './pages/Calender'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calender" element={<Calender />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
