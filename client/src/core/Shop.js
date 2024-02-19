import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./FixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(error);
        setLoading(false);
      } else {
        setCategories(data);
        setLoading(false);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setFilteredResults(data.data);
        setLoading(false);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setLoading(false);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="my-4 px-4 py-2 bg-slate-100 font-medium tracking-wide text-center capitalize transition-colors duration-300  rounded-[14px] hover:bg-[#F2ECE7] hover:text-[#000000dd] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
          >
            Load more
          </button>
        </div>
      )
    );
  };

  const showLoading = () =>
    loading && (
      <div className="bg-green-500 text-white px-2">
        <h2>Loading...</h2>
      </div>
    );

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
    showLoading();
    //eslint-disable-next-line
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Shop Page"
      description="Search And Find Books Of Your Choice"
      className=""
    >
      <div className="flex w-full justify-between ">
        <div className="w-1/2 p">
          <div className="px-6 py-6 text-black bg-slate-200 max-w-xs shadow p-10">
            <h4 className="border-y border-black mb-2">Filter By Categories</h4>
            <ul>
              <Checkbox
                categories={categories}
                handleFilters={(filters) => handleFilters(filters, "category")}
              />
            </ul>

            <h4 className="border-y border-b border-black my-2">
              Filter By Price Range
            </h4>
            <div>
              <RadioBox
                prices={prices}
                handleFilters={(filters) => handleFilters(filters, "price")}
              />
            </div>
          </div>{" "}
        </div>

        <div className="w-full max-w-5xl">
          <h2 className=" bg-gradient-to-r from-gray-800 to-black text-center text-white font-bold p-2">
            Products
          </h2>
          {showLoading()}
          <div className="">
            {filteredResults.map((product, i) => (
              <div key={i} className="  mb-3">
                <Card product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
