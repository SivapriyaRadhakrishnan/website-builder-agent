import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between gap-6">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          Restaurant Logo
        </Link>
        <ul>
          <li>
            <Link to="/home" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
          </li>
          <li>
            <Link to="/menu" className="text-gray-600 hover:text-gray-900">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
          </li>
          <li>
            <Link to="/gallery" className="text-gray-600 hover:text-gray-900">
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </li>
        </ul>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
          Reserve Table Button
        </button>
      </div>
    </nav>
  );
};

export default Navbar;