import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";

const UserDashboard = () => {
  const {
    user: { _id, name, email, role },
    token,
  } = isAuthenticated();

  const [history, setHistory] = useState([]);

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
    //eslint-disable-next-line
  }, []);

  const userLinks = () => {
    return (
      <div className="mb-5   border rounded-lg h-fit w-fit overflow-hidden shadow-xl">
        <h4 className="bg-black  w-fit text-white px-40 py-3 rounded-t">
          User Links
        </h4>
        <ul className="list-group text-center">
          <li className="list-group-item text-center">
            <Link
              to="/cart"
              className=" grid  py-2 px-4 rounded hover:bg-gray-200 font-medium tracking-widest"
            >
              My Shopping Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              to={`/profile/${_id}`}
              className="grid  py-2 px-4 rounded hover:bg-gray-200 font-medium tracking-widest"
            >
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="">
        {" "}
        <div className=" mb-5  border w-fit overflow-hidden shadow-lg">
          <h3 className="bg-black text-white px-20 py-2 text-center rounded-t">
            User Information
          </h3>
          <div className="flex w-fit justify-arround  ">
            <div>
              <ul className="mt-7 mx-4 ">
                <div className="flex">
                  {" "}
                  <li className=" rounded w-fit px-2 px-2 tracking-widest font-bold ">
                    {name}
                  </li>
                </div>
                <div className="flex">
                  {" "}
                  <li className=" rounded w-fit px-2  mt-1 font-bold tracking-widest  mb-1">
                    {email}
                  </li>
                </div>
                <li className=" my-2 px-2 tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  {role === 1 ? "Admin" : `User id : ${_id}`}
                </li>
              </ul>
            </div>
            <div className="">
              <img
                className="w-36"
                src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553__340.png"
                alt="/"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5">
        <header className="bg-gray-100 ">
          <div className="container mx-auto py-4 flex items-center justify-between ">
            <a href="/" className="text-2xl font-bold">
              Purchase History
            </a>
          </div>
        </header>
        <ul className="list-group">
          <li className="list-group-item">
            {history.map((h, i) => {
              return (
                <div>
                  <hr />
                  {h.products.map((p, i) => {
                    return (
                      <div key={i}>
                        <div className="flex flex-wrap">
                          <div className="w-full md:w-1/3 mb-8">
                            <img
                              src="https://dummyimage.com/600x400/000/fff"
                              alt="Product"
                              className="rounded-lg shadow-lg"
                            />
                          </div>
                          <div className="w-full md:w-1/2 px-4">
                            <h1 className="text-3xl font-bold mb-4 mt-2">
                              {" "}
                              {p.name}
                            </h1>
                            <p className="text-gray-600 mb-4">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Duis auctor, risus sed vehicula tempor, eros
                              elit bibendum elit, ac bibendum justo elit id
                              odio. Maecenas auctor velit in sapien sollicitudin
                              dapibus.
                            </p>
                            <div className="flex items-center mb-4">
                              <span className="text-2xl font-bold mr-2">
                                ₹{p.price}
                              </span>
                            </div>
                            <h6 className="text-gray-500 font-midium">
                              <div className="text-black font-medium text-sm">
                                {moment(p.createdAt).fromNow()}
                              </div>
                              Purchased Date
                            </h6>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Welcome, ${name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="flex flex justify-between mb-40">
          {userLinks()}
          {userInfo()}
        </div>

        <div className="xs-col-12 col-sm-8">{purchaseHistory(history)}</div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
