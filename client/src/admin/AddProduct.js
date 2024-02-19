import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { useHistory } from "react-router-dom";
import { createProduct, getCategories } from "./ApiAdmin";

const AddProduct = () => {
  let history = useHistory();
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: 0,
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    formData,
  } = values;

  // load categories and form set data
  const init = () => {
    getCategories().then((data) => {
      if (data.err) {
        setValues({ ...values, error: data.err });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();

    // eslint-disable-next-line
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.err) {
        setValues({ ...values, error: data.err });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: 0,
          loading: "",
          category: "",
          shipping: "",
          createdProduct: data.name,
        });
        history.push("/admin/dashboard");
      }
    });
  };

  const newPostForm = () => (
    <form className="w-full max-w-2xl mx-auto" onSubmit={clickSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
          value={name}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          onChange={handleChange("description")}
          className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-20"
          value={description}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
          value={price}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          onChange={handleChange("category")}
          className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
          value={category}
        >
          <option>Select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="my-2">
        <label>Shipping</label>
        <select
          onChange={handleChange("shipping")}
          className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
          value={shipping}
        >
          <option>Please Select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
          value={quantity}
        />
      </div>
      <h4>Post photo</h4>
      <div className="form-group">
        <label className="">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
            className="text-sm bg-gray-200 appearance-none rounded w-fit  text-gray-700 mb-1  focus:outline-none focus:shadow-outline h-10"
          />
        </label>
      </div>

      <button className="mt-4 w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10">
        Create Product
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="w-full max-w-3xl text-center bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is created</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="w-full mx-auto max-w-3xl text-center bg-green-500">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title="Add a new Product"
      description={`Ready to add a new Product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {showLoading()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
