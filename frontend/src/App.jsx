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

const App = () => {
  return (
    <div>
      <Navbar />
      <StoreContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/details" element={<ProductDetail />} />
            <Route path="/farmers" element={<FarmersPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqsection" element={<FAQSection />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </StoreContextProvider>
      <Footer />
    </div>
  );
};

export default App;
