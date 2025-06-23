import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Sidebar from "./component/Sidebar.jsx";
import AddProduct from "./page/AddProduct.jsx";
import ProductList from "./page/ProductList.jsx";


function App() {
  return (
    <>
      <Navbar />
      <div className="flex">
      <Sidebar />
      <BrowserRouter>
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/product-list" element={<ProductList />} />
        </Routes>
      </div>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
