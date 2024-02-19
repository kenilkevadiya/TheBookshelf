import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";

const UserProfile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    loading: true,
    success: false,
  });

  const { name, email, password,  success, loading } = values;
  const { token } = isAuthenticated();

  const init = (userId) => {
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true, loading: false });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          loading: false,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const profileUpdate = (name, email, password) => (
    <form className="w-full max-w-lg mx-auto">
      <h2 className="font-semibold text-center">Profile Update</h2>
      <div className="">
        <label className="text-muted">Name</label>
        <input
          type="text"
          value={name}
          onChange={handleChange("name")}
          className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          value={email}
          onChange={handleChange("email")}
          className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          value={password}
          onChange={handleChange("password")}
          className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
        />
      </div>

      <button
        onClick={clickSubmit}
        className="mt-4 w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
      >
        Submit
      </button>
    </form>
  );

  const redirectuser = (success) => {
    if (success) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  useEffect(() => {
    init(match.params.userId);
    showLoading();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout
      title="My Profile"
      description="Update your profile"
      className="container-fluid"
    >
      {showLoading()}
      {profileUpdate(name, email, password)}
      {redirectuser(success)}
    </Layout>
  );
};

export default UserProfile;
