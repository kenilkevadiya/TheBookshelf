import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import SliderImg from "./Slider";

const Home = () => {
  const [productsbySell, setProductsBySell] = useState([]);
  const [productsbyArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.err) {
        setError(data.err);
        console.log(error);
        setLoading(false);
      } else {
        setProductsBySell(data);
        setLoading(false);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.err) {
        setError(data.err);
        setLoading(false);
      } else {
        setProductsByArrival(data);
        setLoading(false);
      }
    });
  };

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
    showLoading();
 
  }, []);

  return (
    <>
      <Layout title="THE BOOKSHELF " description="Buy Some Awesome Books Now">
        <div className="">
          <SliderImg />
        </div>
        <Search />

        <h2 className="text-3xl font-bold mb-4">New Arrivals</h2>
        {showLoading()}
        <div className="flex flex-wrap -mx-2">
          {productsbyArrival.map((product, i) => (
            <div
              key={i}
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 px-2 mb-4"
            >
              <Card product={product} />
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-4">Best Sellers</h2>
        {showLoading()}
        <div className="flex flex-wrap -mx-2">
          {productsbySell.map((product, i) => (
            <div
              key={i}
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 px-2 mb-4"
            >
              <Card product={product} />
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Home;
