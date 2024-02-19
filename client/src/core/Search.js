import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }

    // no products found
    if (searched && results.length < 1) {
      return `No Products Found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4 text-lg font-medium text-gray-700">
          {searchMessage(searched, results)}
        </h2>
        <div className=" w-full max-w-lg">
          <div className="grid gap-6">
            {results.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <div className="flex justify-center  py-5 ">
        <div className="flex justify-between gap-4 ">
          <div className="">
            <select
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              onChange={handleChange("category")}
            >
              <option
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                value="All"
              >
                All Categories
              </option>
              {categories.map((c, i) => (
                <option
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  key={i}
                  value={c._id}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="text-sm bg-gray-200 appearance-none rounded w-96 max-w-2xl py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
            onChange={handleChange("search")}
            placeholder="Search By Name"
          />
          <div
            className="w-fit bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
            style={{ border: "none" }}
          >
            <button className="input-group-text">Search</button>
          </div>
        </div>
      </div>
    </form>
  );

  return (
    <div className="container mx-auto my-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-6">{searchForm()}</div>
        <div>{searchedProducts(results)}</div>
      </div>
    </div>
  );
};

export default Search;
