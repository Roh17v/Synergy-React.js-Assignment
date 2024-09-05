import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im"; // For loading spinner icon

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const CreateUserForm: React.FC<{ onUserCreated: (user: User) => void }> = ({
  onUserCreated,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    setName("");
    setEmail("");
    setPhone("");

    const newUser = {
      id: Math.random(), // Temporary ID
      name,
      email,
      phone,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      const createdUser = await response.json();
      onUserCreated(createdUser);
      setIsOpen(false); // Close modal after submission
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false); // Set loading state to false after completion
    }
  };

  return (
    <div>
      {/* Create User Icon */}
      <button
        className="flex items-center justify-center text-2xl text-white bg-green-600 p-2 rounded-full hover:bg-green-700"
        onClick={() => setIsOpen(true)}
      >
        <FaUserPlus />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-2xl font-semibold mb-4">Create New User</h2>

            {/* Loading Spinner */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center space-y-2">
                <ImSpinner2 className="animate-spin text-blue-500 text-3xl" />
                <span className="text-lg">Creating user...</span>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading} // Disable input while loading
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading} // Disable input while loading
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone:
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={isLoading} // Disable input while loading
                  />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                      isLoading ? "cursor-not-allowed" : ""
                    }`}
                    type="submit"
                    disabled={isLoading} // Disable submit button while loading
                  >
                    Create
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => setIsOpen(false)}
                    disabled={isLoading} // Disable cancel button while loading
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateUserForm;
