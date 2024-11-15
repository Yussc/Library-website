import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 p-4 shadow-lg">
      <div className="max-w-screen-xl flex justify-between items-center mx-auto">
        <a href="/" className="flex items-center space-x-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/201/201571.png"
            className="h-10"
            alt="Library Logo"
          />
          <span className="text-white text-3xl font-bold tracking-wide">Library</span>
        </a>
        
        <div className="hidden md:flex space-x-8">
          <a
            href="/"
            className="text-white text-lg font-semibold hover:text-gray-200 transition duration-300"
          >
            Home
          </a>
          <a
            href="/books"
            className="text-white text-lg font-semibold hover:text-gray-200 transition duration-300"
          >
            Liste Livres
          </a>
          <a
            href="/authors"
            className="text-white text-lg font-semibold hover:text-gray-200 transition duration-300"
          >
            Liste Auteurs
          </a>
        </div>

        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-white bg-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 md:hidden"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
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

      <div className="md:hidden" id="navbar-dropdown">
        <ul className="flex flex-col items-center p-4 bg-indigo-600 space-y-4">
          <li>
            <a
              href="/"
              className="text-white text-lg font-semibold hover:text-gray-200 transition duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/books"
              className="text-white text-lg font-semibold hover:text-gray-200 transition duration-300"
            >
              Liste Livres
            </a>
          </li>
          <li>
            <a
              href="/authors"
              className="text-white text-lg font-semibold hover:text-gray-200 transition duration-300"
            >
              Liste Auteurs
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
