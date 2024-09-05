import { useEffect, useState } from "react";
import SkeletonLoader from "../components/SkeletonLoader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface User {
  id: number;
  name: string;
  email: string;
  phone: number;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/users`
        );
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchUsers();
    }, 2000);
  }, []);

  const handleEditClick = (user: User) => {
    setEditingUser(user); // Set the user to be edited
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
    }
  };

  const closeModal = () => {
    setEditingUser(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/users/${editingUser.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editingUser),
          }
        );

        if (response.ok) {
          const updatedUser = await response.json();
          // Simulate updating user in the local state
          const updatedUsers = users.map((user) =>
            user.id === editingUser.id ? updatedUser : user
          );
          setUsers(updatedUsers);
          setEditingUser(null); // Hide the form after successful update
          alert("User updated successfully!");
        } else {
          throw new Error("Failed to update user");
        }
      } catch (err) {
        alert("Failed to update user.");
      }
    }
  };

  const handleDeleteClick = async (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/users/${userId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          // Simulate deleting user in the local state
          setUsers(users.filter((user) => user.id !== userId));
          alert("User deleted successfully!");
        } else {
          throw new Error("Failed to delete user");
        }
      } catch (err: any) {
        alert("Error: " + err.message);
      }
    }
  };

  if (loading)
    return (
      <div className="flex flex-col space-y-4 p-4 max-w-2xl mx-auto">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Users List</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Phone: {user.phone}</p>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => handleEditClick(user)}>
                <FaEdit className="text-blue-500 text-lg hover:text-blue-700" />
              </button>
              <button onClick={() => handleDeleteClick(user.id)}>
                <FaTrashAlt className="text-red-500 text-lg hover:text-red-700" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit User */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editingUser.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone:
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={editingUser.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
