import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Sidebar from "./component/Sidebar.jsx";
import ProductList from "./page/ProductList.jsx";
import Orders from "./page/Orders.jsx";
import Dashboard from "./page/Dashboard.jsx";
import AllUsers from "./page/Users.jsx";
import AllFarmers from "./page/Farmer.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex">
      <Sidebar />
      <BrowserRouter>
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/all-products" element={<ProductList />} />
          <Route path="/all-orders" element={<Orders />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/all-farmers" element={<AllFarmers />} />
        </Routes>
      </div>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
