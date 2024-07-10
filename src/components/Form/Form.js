import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Form() {
  const [formType, setFormType] = useState("");
  const [fillData, setfillData] = useState("");
  const [height, setHeight] = useState("lol");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const navigate = useNavigate();
  let changeForm = (type) => {
    console.log(type);

    let objOfTypes = {
      Size: (
        <>
          <div className="form-floating col-7 my-2">
            <input
              type="number"
              className="form-control"
              id="size"
              name="Size"
              placeholder="Size"
            />
            <label htmlFor="size">Size (MB)</label>
          </div>
          <div>Please provide Size of DVD in MB</div>
        </>
      ),
      Dimensions: (
        <>
          <div className="d-flex col-7 my-2 justify-content-center flex-wrap">
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
          <div>Please, provide Dimensions of the Furniture</div>
        </>
      ),
      Weight: (
        <>
          <div className="form-floating col-7 my-2">
            <input
              type="number"
              className="form-control"
              id="weight"
              name="Weight"
              placeholder="Weight"
            />
            <label htmlFor="weight">Weight (KG)</label>
          </div>
          <div>Please provide Weight of Book in KG</div>
        </>
      ),
    };
    // console.log(objOfTypes[type]);
    setFormType(objOfTypes[type]);
  };
  let formSubm = (e) => {
    e.preventDefault();
    let inputs = document.querySelectorAll(["input", "select"]);
    let flag = true;
    let bodyOfReq = {};
    // console.log(inputs);
    for (let i = 0; i < inputs.length; i++) {
      console.log("loop");
      console.log(inputs[i]);
      if (inputs[i].value ==="") {
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
        <div className="alert alert-danger" role="alert">
          Please, submit required data
        </div>
      );
    }
  };
  return (
    <>
      <form
        id="product_form"
        className="form-floating mt-5 d-flex align-items-center flex-column "
        onSubmit={(e) => formSubm(e)}
      >
        <div className="form-floating col-7 my-2">
          <input
            type="text"
            className="form-control"
            id="sku"
            name="sku"
            placeholder="SKU"
            minLength={8}
            maxLength={8}
          />
          <label htmlFor="sku">SKU</label>
        </div>
        <div className="form-floating col-7 my-2">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Name"
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating col-7 my-2">
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            placeholder="Price"
          />
          <label htmlFor="price">Price($)</label>
        </div>
        <div className="form-floating col-7 my-2">
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
        <div className="d-flex justify-content-around form-floating col-3 my-2">
          <button type="submit" className=" mt-3 btn btn-primary ">
            Save
          </button>
          <Link to="/" className=" mt-3 btn btn-danger ">
            Cancel
          </Link>
        </div>
        {fillData}
      </form>
    </>
  );
}
export default Form;
