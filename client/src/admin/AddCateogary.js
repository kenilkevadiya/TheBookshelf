import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { useHistory } from "react-router-dom";
import { createCategory } from "./ApiAdmin";

const AddCateogary = () => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // Destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError(false);
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    // make request to backend to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);
        history.push("/admin/dashboard");
      }
    });
  };

  const newCategoryForm = () => (
    <form>
      <div className="mx-auto w-full max-w-xl   bg-white rounded-lg shadow overflow-hidden  flex justify-center py-2">
        <label className="font-semibold py-3">Name :</label>
        <div className="w-64 mt-1 ml-2">
          {" "}
          <input
            onChange={handleChange}
            type="name"
            className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
            value={name}
            placeholder="Enter your catagery name"
            required
          />
        </div>
        <div className="ml-2 mt-1">
          <button
            onClick={clickSubmit}
            className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
          >
            Submit
          </button>
        </div>
        <div></div>
      </div>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return (
        <h3 className="w-full max-w-3xl text-center bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4">
          {name} is created
        </h3>
      );
    }
  };

  const showError = () => {
    if (error) {
      return (
        <div className="flex justify-center">
          <h3 className="w-full max-w-xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center">
            {name} is not unique
          </h3>
        </div>
      );
    }
  };

  return (
    <Layout
      title="Add a new Category"
      description={`Ready to add a new category?`}
    >
      <div className="row">
        <div className="block w-full xs:w-auto xs:col-12 sm:col-span-8">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCateogary;
