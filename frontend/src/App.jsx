import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import HomePage from './pages/HomePage';
import Products from './pages/Product';

const App = () => {
  return (
    <div>
       <Navbar />
      <BrowserRouter>
       <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/products" element={<Products />} />
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;