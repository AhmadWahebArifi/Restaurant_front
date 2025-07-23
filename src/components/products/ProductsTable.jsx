import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../axios";

const PRODUCT_DATA = [
  {
    id: 1,
    name: "Qabli",
    description: "Aghani Qablit Palaw",
    category_id: 1,
    is_available: "Exist",
    price: 50,
  },
  {
    id: 2,
    name: "Cake",
    description: "One of the best bevrage of all time.",
    is_available: "Exist",
    category_id: 2,
    price: 10,
  },
  {
    id: 3,
    name: "Pepsi",
    description: "best desserts of all time.",
    is_available: "Exist",
    category_id: 3,
    price: 19.99,
  },
];

const ProductsTable = ({ refreshTrigger, onEditMenuItem }) => {
  const { t, i18n } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = menuItems.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        (product.category && product.category.toLowerCase().includes(term))
    );

    setFilteredProducts(filtered);
  };

  const [menuItems, setMenuItems] = useState(PRODUCT_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMenuItems = async () => {
    console.log("Fetching menu items...");
    setLoading(true);
    try {
      const response = await api.get("/api/menu-item");
      console.log("API Response:", response.data);

      let menuItems = response.data.menuItem; // ✅ Extract the array

      if (Array.isArray(menuItems)) {
        console.log("Menu items fetched successfully:", menuItems.length, "items");
        setMenuItems(menuItems);
        setFilteredProducts(menuItems);
      } else {
        console.warn("API response is not an array:", menuItems);
        setMenuItems(PRODUCT_DATA); // fallback
        setFilteredProducts(PRODUCT_DATA);
      }
    } catch (error) {
      console.error("Error fetching menuItems:", error);
      setError("Failed to load menuItems");
      setMenuItems(PRODUCT_DATA);
      setFilteredProducts(PRODUCT_DATA);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (menuItem) => {
    if (onEditMenuItem) {
      onEditMenuItem(menuItem);
      // Scroll to the form fields after a short delay to ensure the form is populated
      setTimeout(() => {
        const formElement = document.querySelector('form');
        if (formElement) {
          formElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    }
  };

  const handleDelete = async (menuItemId) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) {
      return;
    }

    try {
      const response = await api.delete(`/api/menu-item/${menuItemId}`);
      if (response.status === 200 || response.status === 204) {
        // Refresh the table
        fetchMenuItems();
      } else {
        console.error("Failed to delete menu item");
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [refreshTrigger]); // Refetch when refreshTrigger changes

  // Update filtered products when menuItems data changes
  useEffect(() => {
    if (Array.isArray(menuItems)) {
      setFilteredProducts(menuItems);
    }
  }, [menuItems]);

  if (loading) {
    return (
      <div className="m-4 bg-blue-950 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8">
        <div className="text-center text-gray-100">Loading menuItems...</div>
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
      className=" bg-blue-950 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Menus</h2>
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
                {t("description")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("is_available")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("category")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("price")}
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("action")}
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                  {product.name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.description}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.is_available ? "Available" : "Not Available"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.category}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  ${product.price}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(product.id)}
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
export default ProductsTable;
