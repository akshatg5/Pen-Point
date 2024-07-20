import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-center mb-8 shadow-md">
    <nav className="bg-transparent backdrop-blur-xl fixed w-[55rem] z-20 top-5 rounded-full border border-black">
      <div className="p-4 md:px-8 flex flex-wrap items-center justify-between max-sm:justify-center">
        <a
          href="/blogs"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            PenPoint
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link to="/addblog">
            <Button type="button" className="">
              Get started
            </Button>
          </Link>
          <div className="">
            <Button type="button" onClick={handleLogOut} className="mx-4">
              Logout
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0 mt-4 md:mt-0 font-medium border border-gray-100 md:border-0 rounded-lg dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/blogs"
                className={`block py-2 px-3 rounded md:p-0 ${
                  location.pathname === "/blogs"
                    ? "text-blue-700"
                    : "text-slate-900"
                } md:dark:text-blue-500`}
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/aboutus"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent active:text-blue-700 md:p-0 ${
                  location.pathname === "/aboutus"
                    ? "text-blue-700"
                    : "text-slate-900"
                } dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/services"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                  location.pathname === "/services"
                    ? "text-blue-700"
                    : "text-slate-900"
                } dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/contactus"
                className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ${
                  location.pathname === "/contactus"
                    ? "text-blue-700"
                    : "text-slate-900"
                } dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      </nav>
    </div>
  );
};
