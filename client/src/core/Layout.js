import React from "react";
import Menu from "./Menu";
import "../styles.css";
import Footer from "./footer";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Menu />

        <header className="bg-gradient-to-r from-gray-800 to-black text-white py-3 text-center text-3xl mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center">
              <h2 className="text-3xl font-extrabold tracking-widest">
                {title}
              </h2>
            </div>
            <p className="mt-2 text-xl tracking-widest">{description}</p>
          </div>
        </header>

        <main className={`flex-grow ${className}`}>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <Footer />
        <footer className="bg-gray-800 text-white text-center py-4 ">
          <p>
            &copy; {new Date().getFullYear()} My Website. All rights reserved.
          </p>
        </footer>
      </div>{" "}
    </>
  );
};

export default Layout;
