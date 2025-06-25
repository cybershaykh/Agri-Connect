import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import HomePage from "./pages/HomePage";
// import Products from "./pages/Product";
import FarmersPage from "./pages/Farmer";
import About from "./pages/About";
import FAQSection from "./pages/FAQSection";
import Footer from "./component/Footer";
import Cart from "./pages/Cart";
import StoreContextProvider from "./component/context/StoreContext";
import Login from "./component/Login";
import Register from "./component/Register";
import UserProfile from "./pages/UserProfile";
import AddAddress from "./component/Addaddress";
import AllProducts from "./pages/AllProducts";
import Product from "./product/id/page";
import { Toaster } from "react-hot-toast";
import MyOrders from "./component/MyOrders";
import OrderPlaced from "./component/OrderPlaced";
import FarmerDashboard from "./pages/famerDashboard";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <StoreContextProvider>
          <Toaster position="top-center" />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/farmers" element={<FarmersPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqsection" element={<FAQSection />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/order-placed" element={<OrderPlaced />} />
            <Route path="/farmerdashboard" element={<FarmerDashboard />} />
            
          </Routes>
          <Footer />
        </StoreContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
