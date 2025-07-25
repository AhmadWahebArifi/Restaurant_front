import { useRef, useState, useContext, useEffect } from "react";
import api from "../../axios";
import authContext from "../../store/auth-context";
import { useTranslation } from "react-i18next";

const AddMenuItem = ({ onCustomerAdded, editingMenuItem, onCancelEdit }) => {
  const { t } = useTranslation();
  const cat = t("category");
  const nam = t("name");
  const des = t("description");
  const pr = t("price");
  const adding = t("adding");
  const add = t("add");

  const nameInput = useRef();
  const descriptionInput = useRef();
  const PriceInput = useRef();
  const categoryInput = useRef();
  const ctx = useContext(authContext);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Populate form when editing menu item
  if (editingMenuItem && !isEditing) {
    console.log("=== POPULATING FORM FOR EDITING ===");
    console.log("Editing menu item:", editingMenuItem);
    console.log("Current isEditing state:", isEditing);
    
    nameInput.current.value = editingMenuItem.name || "";
    descriptionInput.current.value = editingMenuItem.description || "";
    PriceInput.current.value = editingMenuItem.price || "";
    categoryInput.current.value = editingMenuItem.category || "";
    
    console.log("Form values set:");
    console.log("Name:", nameInput.current.value);
    console.log("Description:", descriptionInput.current.value);
    console.log("Price:", PriceInput.current.value);
    console.log("Category:", categoryInput.current.value);
    
    setIsEditing(true);
    console.log("isEditing set to true");
  }

  const clearForm = () => {
    console.log("=== CLEARING FORM ===");
    console.log("Current isEditing state:", isEditing);
    
    nameInput.current.value = "";
    descriptionInput.current.value = "";
    PriceInput.current.value = "";
    categoryInput.current.value = "";
    
    console.log("Form values cleared");
    setIsEditing(false);
    console.log("isEditing set to false");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/menu-item/create");
        setCategories(response.data.category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (!ctx.isLogin) {
      setMessage("Please login first to add menu items.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const menuItem = {
        name: nameInput.current.value,
        description: descriptionInput.current.value,
        price: PriceInput.current.value,
        category: categoryInput.current.value,
      };

      console.log("=== SUBMIT HANDLER DEBUG ===");
      console.log("Submitting menu item:", menuItem);
      console.log("Is editing:", isEditing);
      console.log("Editing menu item ID:", editingMenuItem?.id);
      console.log("Editing menu item data:", editingMenuItem);

      let response;
      if (isEditing && editingMenuItem) {
        // Update existing menu item
        console.log("=== UPDATING MENU ITEM ===");
        console.log("Update URL:", `/api/menu-item/${editingMenuItem.id}`);
        console.log("Update data:", menuItem);
        response = await api.put(`/api/menu-item/${editingMenuItem.id}`, menuItem);
      } else {
        // Create new menu item
        console.log("=== CREATING NEW MENU ITEM ===");
        console.log("Create URL:", "/api/menu-item");
        console.log("Create data:", menuItem);
        response = await api.post("/api/menu-item", menuItem);
      }

      console.log("=== API RESPONSE ===");
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);
      console.log("Response headers:", response.headers);

      if (response.status === 201 || response.status === 200) {
        setMessage(`Menu Item ${isEditing ? 'updated' : 'added'} successfully!`);
        clearForm();
        if (onCustomerAdded) {
          console.log("Calling onCustomerAdded callback");
          onCustomerAdded();
        }
      } else {
        setMessage(`Failed to ${isEditing ? 'update' : 'add'} menu item. Please try again.`);
      }
    } catch (error) {
      console.error("=== ERROR DETAILS ===");
      console.error("Error object:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      
      if (error.response?.data?.message) {
        setMessage(`Error: ${error.response.data.message}`);
      } else if (error.response?.data?.error) {
        setMessage(`Error: ${error.response.data.error}`);
      } else {
        setMessage(`Failed to ${isEditing ? 'update' : 'add'} menu item. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!editingMenuItem || !editingMenuItem.id) {
      setMessage("No menu item selected for deletion.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this menu item?")) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await api.delete(`/api/menu-item/${editingMenuItem.id}`);
      
      if (response.status === 200 || response.status === 204) {
        setMessage("Menu item deleted successfully!");
        clearForm();
        if (onCustomerAdded) {
          onCustomerAdded();
        }
      } else {
        setMessage("Failed to delete menu item. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to delete menu item. Please try again.");
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
            {nam}
          </label>
          <input
            ref={nameInput}
            type="text"
            name="name"
            placeholder="Enter name"
            className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            required
          />
        </div>
        <div className="p-5">
          <label
            htmlFor="description"
            className="mb-2.5 block text-base font-medium text-dark dark:text-white"
          >
            {des}
          </label>
          <input
            ref={descriptionInput}
            type="text"
            name="description"
            placeholder="Enter description"
            className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            required
          />
        </div>
        <div className="p-5">
          <label
            htmlFor="price"
            className="mb-2.5 block text-base font-medium text-dark dark:text-white"
          >
            {pr}
          </label>
          <input
            ref={PriceInput}
            type="number"
            name="price"
            placeholder="Enter Price"
            className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            required
          />
        </div>
        <div className="p-5">
          <label
            htmlFor="category"
            className="mb-2.5 block text-base font-medium text-dark dark:text-white"
          >
            {cat}
          </label>
          <select
            ref={categoryInput}
            name="category"
            className="w-96 rounded-lg border border-stroke bg-transparent px-5 py-3 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
            required
          >
            <option value="" className="bg-black text-dark dark:text-white">
              select category
            </option>
            {categories.map((cat, index) => (
              <option
                key={index}
                value={cat}
                className="bg-black text-dark dark:text-white"
              >
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {message && (
        <div
          className={`px-5 py-2 rounded-lg ${
            message.includes("successfully")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
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
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <g clipPath="url(#clip0_906_8052)">
                  <path d="M13.1875 9.28125H10.6875V6.8125C10.6875 6.4375 10.375 6.125 9.96875 6.125C9.59375 6.125 9.28125 6.4375 9.28125 6.84375V9.3125H6.8125C6.4375 9.3125 6.125 9.625 6.125 10.0312C6.125 10.4062 6.4375 10.7187 6.84375 10.7187H9.3125V13.1875C9.3125 13.5625 9.625 13.875 10.0312 13.875C10.4062 13.875 10.7187 13.5625 10.7187 13.1562V10.6875H13.1875C13.5625 10.6875 13.875 10.375 13.875 9.96875C13.875 9.59375 13.5625 9.28125 13.1875 9.28125Z" />
                  <path d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.8125 19.4688 10.0312 19.4688C15.25 19.4688 19.5 15.2188 19.5 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.5625 18.0625 10C18.0625 14.4375 14.4375 18.0625 10 18.0625Z" />
                </g>
                <defs>
                  <clipPath id="clip0_906_8052">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            )}
          </span>
          {loading ? `${adding}...` : isEditing ? "Update Menu Item" : `${add}`}
        </button>

        {isEditing && (
          <>
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={loading}
              className="inline-flex rounded-full border border-gray-600 bg-transparent px-7 py-3 text-center text-base font-medium text-gray-300 shadow-1 hover:bg-gray-700 disabled:border-gray-3 disabled:bg-gray-3 disabled:text-dark-5"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </form>
  );
};
export default AddMenuItem;
