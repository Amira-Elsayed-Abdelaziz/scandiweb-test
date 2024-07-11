// import Product from "../components/Product/Product";
import { useEffect, useState } from "react";
import Product from "../Product/Product";
import { Link } from "react-router-dom";

function AllProducts() {
  const [products, setProducts] = useState([]);
  let getProduct = () => {
    fetch("https://bushub.000webhostapp.com/", {
      "Content-Type": "application/json",
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  };

  useEffect(getProduct, []);
  let deleteSelected = () => {
    let deleteId = [];
    // console.log()
    document
      .querySelectorAll("input[type=checkbox]:checked")
      .forEach((e) => deleteId.push(e.value));
    console.log(JSON.stringify(deleteId));
    fetch("https://bushub.000webhostapp.com/delete.php", {
      "Content-Type": "application/json",
      body: JSON.stringify(deleteId),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getProduct();
      });
  };
  return (
    <div className="d-flex flex-column">
      <div className="mt-3 container d-flex flex-wrap justify-content-center ">
        <Link to="addproduct" className=" btn btn-primary col-3 mx-5">
          ADD
        </Link>
        <button
          id="delete-product-btn"
          className=" btn btn-danger col-3 mx-5"
          onClick={deleteSelected}
        >
          MASS DELETE
        </button>
      </div>
      <div className="container d-flex flex-wrap mt-3 justify-content-center">
        {products.map((element) => (
          <Product product={element} key={element.id}></Product>
        ))}
      </div>
    </div>
  );
}
export default AllProducts;
