import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./ApiAdmin";
import Moment from "moment";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.err);
        setLoading(false);
      } else {
        setOrders(data);
        setLoading(false);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setStatusValues(data);
        setLoading(false);
      }
    });
  };

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status update fail");
      } else {
        loadOrders();
      }
    });
  };
  
  const showStatus = (o) => {
    return (
      <div className="form-group">
        <h3 className="text-indigo-600 mb-4 hover:underline hover:text-indigo-700 transition-colors">
          Status: {o.status}
        </h3>

        <select
          className="w-full px-3 py-2 rounded-md text-gray-700 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          onChange={(e) => handleStatusChange(e, o._id)}
        >
          <option className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white">
            Update Status
          </option>
          {statusValues.map((status, i) => (
            <option
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              key={i}
              value={status}
            >
              {status}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h2 className="text-3xl font-bold mb-4">
          Total Orders: {orders.length}
        </h2>
      );
    } else {
      return (
        <h1 className="w-full py-2 px-3 text-center text-sm font-bold text-gray-700 bg-gray-200 rounded appearance-none mb-1">
          No Orders
        </h1>
      );
    }
  };

  const showInput = (key, value) => {
    return (
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2">{key}</label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={value}
          readOnly
        />
      </div>
    );
  };

  ////tai image

  // const showImage = (productId) => (
  //   <img
  //     src={`/api/products/photo/${productId}`}
  //     alt=""
  //     className="mb-3"
  //     style={{ maxHeight: "100px", maxWidth: "100%" }}
  //   />
  // );

  // const showLoading = () =>
  //   loading && (
  //     <div className="w-full mx-auto max-w-3xl text-center text-indigo-500">
  //       <h2>Loading...</h2>
  //     </div>
  //   );

  // useEffect(() => {
  //   loadOrders();
  //   loadStatusValues();
  //   showLoading();
  //   // eslint-disable-next-line
  // }, []);

  // return (
  //     <Layout title="Orders" description={`Manage all the orders here`} className="container">
  //     {showLoading()}
  //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  //       <div>
  //         {showOrdersLength()}
  //         {orders.map((o, oIndex) => {
  //           return (
  //             <div key={oIndex} className="border-b-4 border-indigo-500 p-4">
  //               <h2 className="text-2xl font-bold mb-4">
  //                 <span className="bg-indigo-500 text-white py-2 px-4 rounded-lg">
  //                   Order Id: {o._id}
  //                 </span>
  //               </h2>
  //               <ul className="list-none">
  //                 <li className="mb-2">{showStatus(o)}</li>
  //                 <li className="mb-2">Transaction ID: {o.transaction_id}</li>
  //                 <li className="mb-2">Amount: {o.amount}</li>
  //                 <li className="mb-2">Ordered by: {o.user.name}</li>
  //                 <li className="mb-2">Order Date: {Moment(o.createdAt).fromNow()}</li>
  //                 <li className="mb-2">Delivery Address: {o.address}</li>
  //               </ul>
  //               <h5 className="mt-4 mb-4 font-italic">
  //                 Total products in the order: {o.products.length}
  //               </h5>
  //               {o.products.map((p, pIndex) => {
  //                 return (
  //                   <div className="mb-4 border-2 border-indigo-500 p-4 rounded-lg" key={pIndex}>
  //                     {showInput('Product Name', p.name)}
  //                     {showInput('Product Price', p.price)}
  //                     {showInput('Product Total', p.count)}
  //                     {showInput('Product ID', p._id)}

  //                   </div>
  //                 );
  //               })}
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </Layout>

  // )
  // }

  // export default Orders;

  const showLoading = () =>
    loading && (
      <div className="w-full mx-auto max-w-3xl text-center text-indigo-500 text-xl">
        <h2>Loading...</h2>
      </div>
    );

  useEffect(() => {
    loadOrders();
    loadStatusValues();
    showLoading();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout
      title="Orders"
      description={`Manage all the orders here`}
      className="container"
    >
      {showLoading()}

      <div>
        {showOrdersLength()}
        {orders.map((o, oIndex) => {
          return (
            <div
              key={oIndex}
              className="relative block overflow-hidden rounded-lg border border-gray-200 p-4 mb-4 sm:p-6 lg:p-8 "
            >
              {" "}
              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
              <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                  <h3 className="text-lg font-bold   text-gray-900 sm:text-xl">
                    Order Id: {o._id}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-gray-600">
                    By {o.user.name}
                  </p>
                </div>

                <div className="hidden sm:block sm:shrink-0">
                  <img
                    alt="Paul Clapton"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    className="h-16 w-16 rounded-lg object-cover shadow-sm"
                  />
                </div>
              </div>
              <ul className="list-none">
                <li className="mb-2 flex  gap-2  text-sm text-gray-500">
                  Transaction ID:{" "}
                  <div className=" text-sm font-bold">{o.transaction_id}</div>
                </li>
                <li className="mb-2 flex  gap-2  text-sm text-gray-500">
                  Amount:<div className=" text-sm font-bold"> {o.amount}</div>
                </li>
                <li className="mb-2 flex  gap-2  text-sm text-gray-500">
                  Order Date:{" "}
                  <div className=" text-sm font-bold">
                    {Moment(o.createdAt).fromNow()}
                  </div>
                </li>
                <div className="mt-4">
                  <p className="flex gap-2 max-w-[40ch] text-sm text-gray-500">
                    Delivery Address:
                    <div className=" text-sm font-bold"> {o.address}</div>
                  </p>
                </div>
              </ul>
              <div className="mb-2 mt-4">{showStatus(o)}</div>
              <h5 className="mt-4 mb-4 bg-gray-100 border border-gray-400 p-1 rounded pl-2">
                Total products in the order: {o.products.length}
              </h5>
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
                }}
              >
                {o.products.map((p, pIndex) => {
                  return (
                    <div
                      className="mb-4 border-2 border-indigo-500 p-4 rounded-lg"
                      key={pIndex}
                    >
                      {showInput("Product Name", p.name)}
                      {showInput("Product Price", p.price)}
                      {showInput("Product Total", p.count)}
                      {showInput("Product ID", p._id)}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Orders;
