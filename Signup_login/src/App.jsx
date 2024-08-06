import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginform from './components/Loginform.jsx'
import './App.css'
function App() {
  const [count, setCount] = useState(0);


  return (
    <>
     <Loginform/>
    </>
  )
}

export default App
