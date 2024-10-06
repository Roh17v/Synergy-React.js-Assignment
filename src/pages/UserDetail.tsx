import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const UserDetail = () => {
  const location = useLocation();
  console.log(location);
  const user = location.state || {}; // Retrieve user details

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        {/* Add more details as needed */}
      </div>
    </>
  );
};

export default UserDetail;
