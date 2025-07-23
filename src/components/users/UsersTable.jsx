import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import api from "../../axios";

const USER_DATA = [
  {
    id: 1,
    name: "Ismail",
    email: "ismail@example.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 2,
    name: "Mahmood",
    email: "mahmood@example.com",
    role: "Staff",
    status: "Active",
  },
  {
    id: 3,
    name: "Ozair",
    email: "ozair@example.com",
    role: "Cleaner",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Sayed",
    email: "sayed@example.com",
    role: "Staff",
    status: "Active",
  },
  {
    id: 5,
    name: "Ahmad",
    email: "ahamd@example.com",
    role: "Owner",
    status: "Active",
  },
];

const UsersTable = ({ refreshTrigger, onEditUser }) => {
  const [t] = useTranslation();
  const [users, setUsers] = useState(USER_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(USER_DATA);

  const fetchUsers = async () => {
    console.log("=== FETCHING USERS ===");
    console.log("Refresh trigger value:", refreshTrigger);
    setLoading(true);
    try {
      const response = await api.get("/api/employee");
      console.log("API Response:", response.data);

      // Handle different response structures
      let userData = response.data;
      if (response.data && response.data.data) {
        userData = response.data.data; // Handle nested data structure
      }

      console.log("Processed user data:", userData);

      if (Array.isArray(userData)) {
        console.log("Users fetched successfully:", userData.length, "users");
        setUsers(userData);
        setFilteredUsers(userData);
      } else {
        console.warn("API response is not an array:", userData);
        setUsers(USER_DATA); // Fallback to default data
        setFilteredUsers(USER_DATA);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users");
      // Fallback to default data on error
      setUsers(USER_DATA);
      setFilteredUsers(USER_DATA);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]); // Refetch when refreshTrigger changes

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!Array.isArray(users)) {
      setFilteredUsers([]);
      return;
    }

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );

    setFilteredUsers(filtered);
  };

  // Update filtered users when users data changes
  useEffect(() => {
    if (Array.isArray(users)) {
      setFilteredUsers(users);
    }
  }, [users]);

  const handleEdit = (user) => {
    if (onEditUser) {
      onEditUser(user);
      // Scroll to the form fields after a short delay to ensure the form is populated
      setTimeout(() => {
        const formElement = document.querySelector("form");
        if (formElement) {
          formElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const response = await api.delete(`/api/employee/${userId}`);
      if (response.status === 200 || response.status === 204) {
        // Refresh the table
        fetchUsers();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return (
      <div className="m-4 bg-blue-950 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8">
        <div className="text-center text-gray-100">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-4 bg-blue-950 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8">
        <div className="text-center text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <motion.div
      className="m-4 bg-blue-950 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Users List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder={t("search")}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("name")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("email")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("role")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("status")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("action")}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredUsers.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-100">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === "Active"
                      ? "bg-green-800 text-green-100"
                      : "bg-red-800 text-red-100"
                      }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default UsersTable;
