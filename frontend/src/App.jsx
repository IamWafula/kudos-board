import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.module.css'

// import react routers
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Home from './pages/home/home';
import BoardPage from './pages/boardsPage/BoardPage';
import CardsPage from './pages/cardsPage/CardPage'


function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({name: "Guest", id: null})

  return (
    <Router>
      {/* insert nav bar here */}
      <Routes>
        <Route path="/"  element={<Home user={user} setUser={setUser} />}/>
        <Route path="/boards"  element={<BoardPage user={user}  setUser={setUser} />}/>
        <Route path="/cards"  element={<CardsPage user={user}  setUser={setUser} />}/>
      </Routes>

    </Router>
  )
}

export default App
