import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getProducts, deleteProduct } from "./ApiAdmin";

const ManageProducts = (props) => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout title="Manage Products" description={`Perform CRUD on products`}>
      <div className="w-full max-w-2xl mx-auto ">
        <div className="col-12">
          <h2 className="text-center font-bold text-xl mb-4">
            Total {products.length} Products
          </h2>
          <hr className="mb-8" />
          <ul className="space-y-4">
            {products.map((p, i) => (
              <li
                key={i}
                className="flex justify-between items-center py-4 px-6 bg-white shadow-lg rounded-lg"
              >
                <div className="w-3/5 max-w-xs">{p.name}</div>
                <div className="flex items-center justify-end space-x-4">
                  <Link to={`/admin/products/update/${p._id}`}>
                    <span className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                      ✏️ Update
                    </span>
                  </Link>
                  <span
                    onClick={() => destroy(p._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                  >
                    🗑️ Delete
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
