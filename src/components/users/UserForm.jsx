import { useRef, useState, useContext } from "react";
import api from "../../axios";
import authContext from "../../store/auth-context";
import { useTranslation } from "react-i18next";

const UserForm = ({ onUserAdded, editingUser, onCancelEdit }) => {
  const [t] = useTranslation();

  const nameInput = useRef();
  const emailInput = useRef();
  const roleInput = useRef();
  const statusInput = useRef();
  const ctx = useContext(authContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Populate form when editing user
  if (editingUser && !isEditing) {
    console.log("=== POPULATING USER FORM FOR EDITING ===");
    console.log("Editing user:", editingUser);
    console.log("Current isEditing state:", isEditing);
    
    nameInput.current.value = editingUser.name || "";
    emailInput.current.value = editingUser.email || "";
    roleInput.current.value = editingUser.role || "";
    statusInput.current.value = editingUser.status || "";
    
    console.log("Form values set:");
    console.log("Name:", nameInput.current.value);
    console.log("Email:", emailInput.current.value);
    console.log("Role:", roleInput.current.value);
    console.log("Status:", statusInput.current.value);
    
    setIsEditing(true);
    console.log("isEditing set to true");
  }

  const clearForm = () => {
    console.log("=== CLEARING USER FORM ===");
    console.log("Current isEditing state:", isEditing);
    
    nameInput.current.value = "";
    emailInput.current.value = "";
    roleInput.current.value = "";
    statusInput.current.value = "";
    
    console.log("Form values cleared");
    setIsEditing(false);
    console.log("isEditing set to false");
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (!ctx.isLogin) {
      setError("Please login first to add users.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userData = {
        name: nameInput.current.value,
        email: emailInput.current.value,
        role: roleInput.current.value,
        status: statusInput.current.value,
      };

      console.log("=== USER FORM SUBMIT DEBUG ===");
      console.log("Submitting user data:", userData);
      console.log("Is editing:", isEditing);
      console.log("Editing user ID:", editingUser?.id);

      let response;
      if (isEditing && editingUser) {
        // Update existing user
        console.log("=== UPDATING USER ===");
        console.log("Update URL:", `/api/employee/${editingUser.id}`);
        console.log("Update data:", userData);
        response = await api.put(`/api/employee/${editingUser.id}`, userData);
      } else {
        // Create new user
        console.log("=== CREATING NEW USER ===");
        console.log("Create URL:", "/api/employee");
        console.log("Create data:", userData);
        response = await api.post("/api/employee", userData);
      }

      console.log("=== API RESPONSE ===");
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 201 || response.status === 200) {
        console.log("Success! Calling onUserAdded callback");
        clearForm();
        if (onUserAdded) {
          onUserAdded();
        }
      } else {
        setError(`Failed to ${isEditing ? 'update' : 'add'} user. Please try again.`);
      }
    } catch (error) {
      console.error("=== ERROR DETAILS ===");
      console.error("Error object:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      
      if (error.response?.data?.message) {
        setError(`Error: ${error.response.data.message}`);
      } else if (error.response?.data?.error) {
        setError(`Error: ${error.response.data.error}`);
      } else if (error.response?.data?.errors) {
        // Handle validation errors
        const errorMessages = Object.values(error.response.data.errors).flat();
        setError(`Validation errors: ${errorMessages.join(', ')}`);
      } else {
        setError(`Failed to ${isEditing ? 'update' : 'add'} user. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!editingUser || !editingUser.id) {
      setError("No user selected for deletion.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.delete(`/api/user/${editingUser.id}`);

      if (response.status === 200 || response.status === 204) {
        clearForm();
        if (onUserAdded) {
          onUserAdded();
        }
      } else {
        setError("Failed to delete user. Please try again.");
      }
    } catch (error) {
      setError("Failed to delete user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    clearForm();
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <form method="post" onSubmit={SubmitHandler}>
      <div className="flex flex-wrap">
        <div className="p-5">
          <label
            htmlFor="name"
            className="mb-2.5 block text-base font-medium text-dark dark:text-white"
          >
            {t("name")}
          </label>
          <input
            ref={nameInput}
            type="text"
            name="name"
            placeholder="Enter full name"
            className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            required
          />
        </div>
        <div className="p-5">
          <label
            htmlFor="email"
            className="mb-2.5 block text-base font-medium text-dark dark:text-white"
          >
            {t("email")}
          </label>
          <input
            ref={emailInput}
            type="email"
            name="email"
            placeholder="Enter email address"
            className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            required
          />
        </div>
        <div className="p-5">
          <label
            htmlFor="role"
            className="mb-2.5 block text-base font-medium text-dark dark:text-white"
          >
            {t("role")}
          </label>
          <select
            ref={roleInput}
            name="role"
            className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:bg-gray-700"
            required
          >
            <option value="" className="text-black bg-white">Select Role</option>
            <option value="Manager" className="text-black bg-white">Manager</option>
            <option value="Staff" className="text-black bg-white">Staff</option>
            <option value="Cleaner" className="text-black bg-white">Cleaner</option>
            <option value="Owner" className="text-black bg-white">Owner</option>
          </select>
        </div>
        <div className="p-5">
          <label
            htmlFor="status"
            className="mb-2.5 block text-base font-medium text-dark dark:text-white"
          >
            {t("status")}
          </label>
          <select
            ref={statusInput}
            name="status"
            className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:bg-gray-700"
            required
          >
            <option value="" className="text-black bg-white">Select Status</option>
            <option value="Active" className="text-black bg-white">Active</option>
            <option value="Inactive" className="text-black bg-white">Inactive</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="px-5 py-2 rounded-lg bg-red-100 text-red-800">
          {error}
        </div>
      )}

      <div className="flex gap-4 m-12">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex rounded-full border border-transparent bg-blue-950 px-7 py-3 text-center text-base font-medium text-white shadow-1 hover:bg-blue-700 disabled:border-gray-3 disabled:bg-gray-3 disabled:text-dark-5 dark:bg-gray-2 dark:shadow-box-dark dark:hover:bg-dark-3"
        >
          <span className="pr-[10px] flex items-center">
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15M15 8H1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          {loading ? "Processing..." : isEditing ? "Update User" : "Add User"}
        </button>

        {isEditing && (
          <>
            {/* <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="inline-flex rounded-full border border-transparent bg-red-600 px-7 py-3 text-center text-base font-medium text-white shadow-1 hover:bg-red-700 disabled:border-gray-3 disabled:bg-gray-3 disabled:text-dark-5"
            >
              Delete User
            </button> */}
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={loading}
              className="inline-flex rounded-full border border-gray-300 bg-transparent px-7 py-3 text-center text-base font-medium text-gray-700 shadow-1 hover:bg-gray-50 disabled:border-gray-3 disabled:bg-gray-3 disabled:text-dark-5"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default UserForm; 