import "./App.css"
import Home from "./pages/Home/Home"
import Quiz from "./pages/Quiz/Quiz"
import End from "./pages/End/End"
import { Routes, Route } from "react-router-dom"
import React, { createContext, useState } from "react"
export const UserContext = createContext()

function App() {
  const [user, setUser] = useState("")
  const [score, setScore] = useState(0)
  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <Routes>
          <Route path="/*" element={<Home setUser={setUser} />} />
          <Route
            path="quiz"
            element={<Quiz score={score} setScore={setScore} />}
          />
          <Route path="end" element={<End score={score} />} />
        </Routes>
      </div>
    </UserContext.Provider>
  )
}

export default App
