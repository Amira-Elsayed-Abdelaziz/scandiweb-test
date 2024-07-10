import "./Product.css";
function Product(props) {
const product=props.product;
  return (
    <>
      <div className="card mx-4 my-4">
        <div className="card-header">
          <input
            name="deleteProducts"
            className="delete-checkbox"
            type="checkbox"
            value={product.id}
          />
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-center">{product.sku}</li>
          <li className="list-group-item text-center">{product.name}</li>
          <li className="list-group-item text-center">{product.price} $</li>
          <li className="list-group-item text-center">{product.type} : {props.product.type_value} </li>
        </ul>
      </div>
    </>
  );
}
export default Product;
