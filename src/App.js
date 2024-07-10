import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Form/Form";
import AllProducts from "./components/AllProducts/AllProducts";

import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
}

export default App;
