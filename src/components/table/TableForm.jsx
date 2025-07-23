import { useRef, useState, useContext } from "react";
import api from "../../axios";
import authContext from "../../store/auth-context";
import { useTranslation } from "react-i18next";

const Table = ({ onUserAdded, editingUser, onCancelEdit }) => {
  const [t] = useTranslation();

  const nameInput = useRef();
  const statusInput = useRef();
  const ctx = useContext(authContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Populate form when editing user
  if (editingUser && !isEditing) {
    nameInput.current.value = editingUser.name || "";
    emailInput.current.value = editingUser.email || "";
    roleInput.current.value = editingUser.role || "";
    statusInput.current.value = editingUser.status || "";
    setIsEditing(true);
  }

  const clearForm = () => {
    nameInput.current.value = "";
    emailInput.current.value = "";
    roleInput.current.value = "";
    statusInput.current.value = "";
    setIsEditing(false);
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
        status: statusInput.current.value,
      };

      let response;
      if (isEditing && editingUser) {
        // Update existing user
        response = await api.put(`/api/employee/${editingUser.id}`, userData);
      } else {
        // Create new user
        response = await api.post("/api/table", userData);
      }

      if (response.status === 201 || response.status === 200) {
        clearForm();
        if (onUserAdded) {
          onUserAdded();
        }
      } else {
        setError(
          `Failed to ${isEditing ? "update" : "add"} table. Please try again.`
        );
      }
    } catch (error) {
      setError(
        `Failed to ${isEditing ? "update" : "add"} table. Please try again.`
      );
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
            placeholder="Enter table name"
            className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            required
          />
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
            <option value="" className="text-black bg-white">
              Select Status
            </option>
            <option value="true" className="text-black bg-white">
              Active
            </option>
            <option value="false" className="text-black bg-white">
              Inactive
            </option>
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
          {loading ? "Processing..." : isEditing ? "Update table" : "Add table"}
        </button>

        {isEditing && (
          <>
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

export default Table;
