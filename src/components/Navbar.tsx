import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="shadow-lg flex items-center justify-between fixed top-0 left-0 z-50 w-full h-14 md:h-16 bg-white px-4">
      {/* Logo */}
      <div className="text-2xl font-bold flex-shrink-0">
        <Link to="/">Logo</Link>
      </div>

      {/* Hamburger Menu Icon for small screens */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </div>

      {/* Links for larger screens */}
      <ul className="hidden md:flex gap-8 text-xl py-2 flex-grow justify-center">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/aboutus">
          <li>About Us</li>
        </Link>
        <Link to="/contact">
          <li>Contact</li>
        </Link>
      </ul>

      {/* Sliding menu for small screens */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-800 text-white w-64 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex mt-2 mr-2">
          <button className="ml-auto" onClick={toggleMenu}>
            <FaTimes className="text-2xl" />
          </button>
        </div>
        <ul className="flex flex-col gap-8 text-xl py-8 px-4">
          <Link to="/" onClick={toggleMenu}>
            <li>Home</li>
          </Link>
          <Link to="/aboutus" onClick={toggleMenu}>
            <li>About Us</li>
          </Link>
          <Link to="/contact" onClick={toggleMenu}>
            <li>Contact</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
