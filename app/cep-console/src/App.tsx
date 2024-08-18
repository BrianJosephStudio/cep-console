import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import { Console } from './components/Console'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:roomIdentifier" element={<Console />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Router>
  )
}

export default App
