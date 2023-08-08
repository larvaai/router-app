import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './index.css'

function App() {
  return (
    <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

function Home() {

  return (
    <>
      <h2>Hello React Router</h2>
    </>
  )
}

function About() {

  return (
    <>
      <h2>Information about React Router</h2>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
