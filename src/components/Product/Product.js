import "./Product.css";
function Product(props) {
const product=props.product;
  return (
    <>
      <div className=" bg-primary bg-gradient card border-primary border border-2 mx-4 my-4">
        <div className="card-header">
          <input
            name="deleteProducts"
            className="delete-checkbox form-check-input"
            type="checkbox"
            value={product.id}
          />
        </div>
        <ul className="list-group list-group-flush bg-dark ">
          <li className="list-group-item text-center bg-transparent text-light">{product.sku}</li>
          <li className="list-group-item text-center bg-transparent text-light">{product.name}</li>
          <li className="list-group-item text-center bg-transparent text-light">{product.price} $</li>
          <li className="list-group-item text-center bg-transparent text-light">{product.type} : {props.product.type_value} </li>
        </ul>
      </div>
    </>
  );
}
export default Product;
