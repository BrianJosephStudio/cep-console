import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import { Console } from './components/Console'
import { StartSession } from './components/StartSession'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:roomIdentifier" element={<Console />} />
        <Route path="*" element={<StartSession/>} />
      </Routes>
    </Router>
  )
}

export default App
