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
import AddAddress from "./component/AddAddress";
import AllProducts from "./pages/AllProducts";
import Product from "./product/id/page";
import { Toaster } from "react-hot-toast";
import MyOrders from "./component/MyOrders";
import OrderPlaced from "./component/OrderPlaced";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import AdminDashboard from "./pages/adminDashboard";
import NotFound from "./pages/NotFound";
import DroneTechnology from "./pages/Drone";
import DroneDG6000Review from "./pages/Drone1";
import FutureFarmingAIDrone from "./pages/Drone2";
import UserOrder from "./pages/UserOrder";
import FarmerDashboard from "./pages/farmerDashboard";

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
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/order-placed" element={<OrderPlaced />} />
            <Route path="/farmerdashboard" element={<FarmerDashboard />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/list-product" element={<ProductList />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/increase-crop-yields-drone-technology" element={<DroneTechnology />} />
            <Route path="/drone-dg6000-review-2025" element={<DroneDG6000Review />} />
            <Route path="/future-farming-ai-drone-2025" element={<FutureFarmingAIDrone />} />
            <Route path="/userorder" element={<UserOrder />} />
          </Routes>
          <Footer />
        </StoreContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
