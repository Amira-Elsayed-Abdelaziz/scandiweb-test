import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../../App";
import AllProducts from "../AllProducts/AllProducts";
import Form from "../Form/Form";
function Routers() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<AllProducts />} />
            <Route path="addproduct" element={<Form />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default Routers;
