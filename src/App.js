import "./App.css"
import Home from "./pages/Home/Home"
import Quiz from "./pages/Quiz/Quiz"
import End from "./pages/End/End"
import { Routes, Route } from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="endgame" element={<End />} />
      </Routes>
    </div>
  )
}

export default App
