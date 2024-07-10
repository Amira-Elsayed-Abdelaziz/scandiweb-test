// import Product from "../components/Product/Product";
import { useEffect, useState } from "react";
import Product from "../Product/Product";
import { Link } from "react-router-dom";

function AllProducts() {
  const [products, setProducts] = useState([]);
  let getProduct = () => {
    fetch("https://bushub.000webhostapp.com/",{
    "Content-Type": "application/json",
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  };

  useEffect(() => getProduct, []);
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
    <>
      <Link to="addproduct" className="mx-4 btn btn-outline-primary ">
        ADD
      </Link>
      <button
        id="delete-product-btn"
        className="mx-4 btn btn-outline-danger"
        onClick={deleteSelected}
      >
        MASS DELETE
      </button>
      <div className="container d-flex flex-wrap mt-3">
        {products.map((element) => (
          <Product product={element} key={element.id}></Product>
        ))}
      </div>
    </>
  );
}
export default AllProducts;
