import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Form.css";
function Form() {
  const [formType, setFormType] = useState("");
  const [fillData, setfillData] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const navigate = useNavigate();
  const objOfTypes = {
    Size: (
      <>
        <div className="form-floating col-7 my-3">
          <input
            type="number"
            className="form-control"
            id="size"
            name="Size"
            placeholder="Size"
          />
          <label htmlFor="size">Size (MB)</label>
        </div>
        <div className="text-light">Please provide Size of DVD in MB</div>
      </>
    ),
    Dimensions: (
      <>
        <div className="d-flex col-7 my-3 justify-content-center flex-wrap">
          <div className="form-floating ">
            <input
              type="number"
              className="form-control"
              id="height"
              name="Height"
              placeholder="Height"
              onChange={(e) => {
                setHeight(e.target.value);
              }}
            />
            <label htmlFor="height">Height (CM)</label>
          </div>
          <div className="form-floating ">
            <input
              type="number"
              className="form-control"
              id="width"
              name="Width"
              placeholder="Width"
              onChange={(e) => {
                setWidth(e.target.value);
              }}
            />
            <label htmlFor="width">Width (CM)</label>
          </div>
          <div className="form-floating ">
            <input
              type="number"
              className="form-control"
              id="length"
              name="Length"
              placeholder="Length"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">Length (CM)</label>
          </div>
        </div>
        <div className="text-light">
          Please, provide Dimensions of the Furniture
        </div>
      </>
    ),
    Weight: (
      <>
        <div className="form-floating col-7 my-3">
          <input
            type="number"
            className="form-control"
            id="weight"
            name="Weight"
            placeholder="Weight"
          />
          <label htmlFor="weight">Weight (KG)</label>
        </div>
        <div className="text-light">Please provide Weight of Book in KG</div>
      </>
    ),
  };
  let changeForm = (type) => {
    setFormType(objOfTypes[type]);
  };
  let formSubm = (e) => {
    e.preventDefault();
    let inputs = document.querySelectorAll(["input", "select"]);
    let flag = true;
    let bodyOfReq = {};
    for (let i = 0; i < inputs.length; i++) {
      console.log("loop");
      console.log(inputs[i]);
      if (inputs[i].value === "") {
        inputs[i].classList.add("is-invalid");
        flag = false;
      } else {
        inputs[i].classList.remove("is-invalid");
        bodyOfReq[inputs[i].name] = inputs[i].value;
      }
    }
    bodyOfReq["Dimensions"] = height + "x" + width + "x" + length;

    if (flag) {
      setfillData("");
      fetch("https://bushub.000webhostapp.com/add.php", {
        "Content-Type": "application/json",
        body: JSON.stringify(bodyOfReq),
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data["error"]) {
            setfillData(
              <div className="alert alert-danger" role="alert">
                {data["error"]}
              </div>
            );
          } else {
            navigate("/");
          }
        });
    } else {
      setfillData(
        <div className="my-3 alert alert-danger col-7 text-center" role="alert">
          Please, submit required data
        </div>
      );
    }
  };
  return (
    <>
      <form
        id="product_form"
        className="form-floating d-flex justify-content-center align-items-center flex-column " 
        onSubmit={(e) => formSubm(e)}
      >
        <div className="form-floating col-7 my-3">
          <input
            type="text"
            className="form-control"
            id="sku"
            name="sku"
            placeholder="SKU"
          />
          <label htmlFor="sku">SKU</label>
        </div>
        <div className="form-floating col-7 my-3">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Name"
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating col-7 my-3">
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            placeholder="Price"
          />
          <label htmlFor="price">Price($)</label>
        </div>
        <div className="form-floating col-7 my-3">
          <select
            id="productType"
            className="form-select"
            name="type"
            onChange={(e) => changeForm(e.target.value)}
            defaultValue=""
          >
            <option disabled value="">
              {" "}
              -- select an option --{" "}
            </option>
            <option id="DVD" value="Size">
              DVD
            </option>
            <option id="Furniture" value="Dimensions">
              Furniture
            </option>
            <option id="Book" value="Weight">
              Book
            </option>
          </select>
          <label htmlFor="productType">Product Type</label>
        </div>
        {formType}
        <div className="my-3 container d-flex flex-wrap justify-content-center">
          <button type="submit" className=" mt-3 btn btn-primary col-3 mx-5">
            Save
          </button>
          <Link to="/" className=" mt-3 btn btn-danger col-3 mx-5">
            Cancel
          </Link>
        </div>
        {fillData}
      </form>
    </>
  );
}
export default Form;
