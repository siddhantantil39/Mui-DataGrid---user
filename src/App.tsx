import './App.css'
import Details from './components/Details/Details';
import Grid from './components/Grid/Grid'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Grid/>}/>
        <Route path='/details/:id' element={<Details/>}/>
        <Route path="/details" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
