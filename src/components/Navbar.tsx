import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="shadow-lg flex items-center justify-center fixed top-0 left-0 z-50 w-full h-14 md:h-16 bg-white">
      <ul className="flex gap-8 text-xl py-2 px-4">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/aboutus"}>
          <li>About Us</li>
        </Link>
        <Link to={"/contact"}>
          <li>Contact</li>
        </Link>
      </ul>
    </nav>

    
  );
};

export default Navbar;
