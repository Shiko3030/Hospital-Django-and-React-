"use client";

import { Link } from "react-router-dom";


export function Navbar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite-react.co" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
           Hospital 
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5h14M3 10h14M3 15h14"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col md:flex-row md:space-x-8 md:mt-0">
            <li>
              <Link to="/">
                <span   id="nav" className="block    py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700">
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link to="/departments">
                <span   id="nav" className="block   py-2 px-3 text-gray-700 hover:bg-gray-100 md:hover:bg-transparent">
                Departments
                </span>
              </Link>
            </li>
            <li>
              <Link to="/appointment">
                <span   id="nav" className="block   py-2 px-3 text-gray-700 hover:bg-gray-100 md:hover:bg-transparent">
                Appointment
                </span>
              </Link>
            </li>
            <li>
              <Link to="/employee">
                <span  id="nav"  className="block   py-2 px-3 text-gray-700 hover:bg-gray-100 md:hover:bg-transparent">
                Employee
                </span>
              </Link>
            </li>
            <li>
              <Link to="/operation">
                <span   id="nav" className="block   py-2 px-3 text-gray-700 hover:bg-gray-100 md:hover:bg-transparent">
                Operatione
                </span>
              </Link>
            </li>
            <li>
              <Link to="/pationte">
                <span   id="nav" className="block   py-2 px-3 text-gray-700 hover:bg-gray-100 md:hover:bg-transparent">
                Pationte
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
