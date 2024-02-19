import React from "react";
import axios from "axios";
import { useState } from "react";

function UpdatePassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/updatepassword",
        { data: formData }
      );
      console.log(response);

      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
    >
      <div class="relative py-3 w-full sm:max-w-xl sm:mx-auto">
        <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div class="max-w-md mx-auto">
            <div>
              <h1 class="text-2xl font-semibold">Change Password</h1>
            </div>
            <div class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div class="relative">
                  <label for="email" className="text-sm">
                    Email:
                  </label>
                  <input
                    value={formData.email}
                    onChange={handleInputChange}
                    autocomplete="off"
                    id="email"
                    name="email"
                    type="text"
                    className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                    placeholder="Email address"
                  />
                </div>
                <div class="relative">
                  <label for="email" className="text-sm">
                    Password:
                  </label>

                  <input
                    autocomplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div class="relative ">
                  <button className="w-full bg-gray-800 hover:bg-grey-900 py-2 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default UpdatePassword;
