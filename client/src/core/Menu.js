import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import logo from "../assets/logoblack-1.jpg";
import { ImHome } from "react-icons/im";
import { AiTwotoneShopping } from "react-icons/ai";
import { FaUserShield } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { GoSignIn } from "react-icons/go";
import { RiLoginBoxFill } from "react-icons/ri";




const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900", fontWeight: "" };
  } else return { color: "black", fontWeight: "normal" };
};

const Menu = ({ history }) => {
  return (
    <div>
      <div className="z-50 h-16 fixed  top-0 left-0 right-0  text-slate-900 flex bg-white overflow-hidden shadow-2xl ">
        <div className=" lg:w-48 mt-1 sm:w-96 cursor-pointer">
          <img src={logo} alt="" href="" />
        </div>
        <div className="flex items-center justify-around gap-10  ">
          <div className=" hover:bg-slate-100 p-2 rounded">
            <Link className="flex gap-1" style={isActive(history, "/")} to="/">
              <ImHome className="mt-1"/>HOME
            </Link>
          </div>
          <div className="hover:bg-slate-100 p-2 rounded">
            <Link className="flex gap-1" style={isActive(history, "/shop")} to="/shop">
             <AiTwotoneShopping className="mt-1"/> SHOP
            </Link>
          </div>
          {!isAuthenticated() && (
            <Fragment>
              <div className="hover:bg-slate-100 p-2 rounded">
                <Link
                  className="flex gap-1"
                  style={isActive(history, "/signin")}
                  to="/signin"
                >
                <RiLoginBoxFill className="mt-1"/>  LOGIN
                </Link>
              </div>

              <div className="hover:bg-slate-100 p-2 rounded">
                <Link
                  className="flex gap-1"
                  style={isActive(history, "/signup")}
                  to="/signup"
                >
                  <GoSignIn className="mt-1"/>SIGNUP
                </Link>
              </div>

              <div className=" ml-auto hover:bg-slate-100 p-2 rounded">
                <Link
                  className="flex gap-1"
                  style={isActive(history, "/about")}
                  to="/about"
                >
                <IoIosInformationCircle className="mt-1"/>ABOUT
                </Link>
              </div>
            </Fragment>
          )}
        </div>

        {isAuthenticated() && (
          <Fragment>
            <div className="flex items-center justify-around mx-10 gap-8 ">
              {isAuthenticated().user.role === 0 && (
                <div className=" hover:bg-slate-100 p-2 rounded">
                  <Link
                    className="flex gap-1"
                    style={isActive(history, "/user/dashboard")}
                    to="/user/dashboard"
                  >
                  <FaUserShield className="mt-1" />  DASHBOARD
                  </Link>
                </div>
              )}
              {isAuthenticated().user.role === 1 && (
                <div className="flex items-center justify-around gap-10">
                  <Link
                    className="hover:bg-slate-100 p-2 rounded flex gap-1"
                    style={isActive(history, "/admin/dashboard")}
                    to="/admin/dashboard"
                  >
                   <FaUserShield className="mt-1"/> DASHBOARD
                  </Link>
                </div>
              )}
              <div className="">
                <Link
                  className="hover:bg-slate-100 p-2 rounded flex gap-1"
                  style={isActive(history, "/cart")}
                  to="/cart"
                >
                  <FaShoppingCart className="mt-1"/>CART{" "}
                  <sup>
                    <small className="bg-red-500 rounded-full px-1">
                      {itemTotal()}
                    </small>
                  </sup>
                </Link>
              </div>
              <div className="flex items-center justify-around gap-10 ">
                <Link
                  className="hover:bg-slate-100 p-2 rounded flex gap-1"
                  style={isActive(history, "/about")}
                  to="/about"
                >
                <IoIosInformationCircle className="mt-1"/>ABOUT
                </Link>
              </div>
              <div className="">
                <span
                  className="hover:bg-slate-100 p-2 rounded text-black flex gap-1"
                  onClick={() =>
                    signout(() => {
                      history.push("/");
                    })
                  }
                >
                  <FiLogOut className="mt-1"/>LOGOUT
                </span>
              </div>{" "}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default withRouter(Menu);
