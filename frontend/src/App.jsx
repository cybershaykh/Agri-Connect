import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import HomePage from "./pages/HomePage";
import Products from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import FarmersPage from "./pages/Farmer";
import About from "./pages/About";
import FAQSection from "./pages/FAQSection";
import Footer from "./component/Footer";
import Cart from "./pages/Cart";
import StoreContextProvider from "./component/context/StoreContext";
import Login from "./component/Login";
import Register from "./component/Register";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <StoreContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/details" element={<ProductDetail />} />
            <Route path="/farmers" element={<FarmersPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqsection" element={<FAQSection />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Toaster position="top-center" />
          <Footer />
        </StoreContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
