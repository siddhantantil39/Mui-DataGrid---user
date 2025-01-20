import { lazy } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Details = lazy(() => import('./components/Details/Details'));
const Grid = lazy(() => import('./components/Grid/Grid'));

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
