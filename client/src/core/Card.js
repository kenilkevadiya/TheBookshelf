import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="my-4 mr-2 px-4 py-2 font-medium tracking-wide text-center capitalize transition-colors duration-300  bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80">
            View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="my-4 px-4 py-2 bg-slate-100 font-medium tracking-wide text-center capitalize transition-colors duration-300  rounded-[14px] hover:bg-[#F2ECE7] hover:text-[#000000dd] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="inline-block px-2 py-1 text-xs tracking-wide font-semibold text-blue-900 bg-blue-100 rounded-full">
        In Stock
      </span>
    ) : (
      <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
        Out of Stock
      </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className="mt-4">
          <div className="flex items-center">
            <label htmlFor="quantity" className="mr-2">
              Adjust Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              value={count}
              className="w-16 py-2 px-4 text-center bg-gray-100 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <>
      <div>
        <section className="text-gray-600 py-4 body-font">
          <div className="container  mx-auto">
            <div className="flex flex-wrap -m-4">
              <div className="p-4 ">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  {shouldRedirect(redirect)}

                  <ShowImage
                    item={product}
                    url="product"
                    className=""
                    alt="blog"
                  />
                  <div className="p-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      {product.category && product.category.name}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {product.name}
                    </h1>

                    <p className="leading-relaxed mb-3 ">
                      {showFullDescription
                        ? product.description
                        : `${product.description.slice(0, 100)} ....`}
                      <span
                        className="font-bold cursor-pointer"
                        onClick={() =>
                          setShowFullDescription(!showFullDescription)
                        }
                      >
                        {showFullDescription ? "  ....Show Less" : "Show More"}
                      </span>
                    </p>

                    <p className="my-2 text-[17px] font-bold text-[#0FB478]">
                      ₹ {product.price}
                    </p>
                    {showStock(product.quantity)}
                    <br />
                    {showViewButton(showViewProductButton)}
                    {showRemoveButton(showRemoveProductButton)}
                    {showAddToCart(showAddToCartButton)}
                    {showCartUpdateOptions(cartUpdate)}
                    <div className="flex items-center flex-wrap ">
                      <a
                        href=" "
                        className="text-indigo-500 inline-flex items-center text-sm md:mb-2 lg:mb-0"
                      >
                        {moment(product.createdAt)
                          .fromNow()
                          .split(" ")
                          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                          .join(" ")}

                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                      <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        1.2K
                      </span>
                      <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                        6
                      </span>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Card;
