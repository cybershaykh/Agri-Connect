import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Sidebar from "./component/Sidebar.jsx";


function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <BrowserRouter>
        <Routes>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
