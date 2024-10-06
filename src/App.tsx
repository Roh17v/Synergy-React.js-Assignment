import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <>
      <Navbar />
      <div className="mt-14 md:mt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
