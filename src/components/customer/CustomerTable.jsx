import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../axios";
import { useTranslation } from "react-i18next";

const PRODUCT_DATA = [
  {
    id: 1,
    name: "Ahmad",
    phone: "0723219291",
    address: "kabul",
  },
  {
    id: 2,
    name: "Ozair",
    phone: "0723129291",
    address: "kabul",
  },
];

const CustomerTable = ({ refreshTrigger, onEditCustomer }) => {
  const [t] = useTranslation();

  const [customers, setCustomers] = useState(PRODUCT_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/customer");

      // Handle different response structures
      let customerData = response.data;
      if (response.data && response.data.data) {
        customerData = response.data.data; // Handle nested data structure
        console.log("hasdf");
      }

      if (Array.isArray(customerData)) {
        setCustomers(customerData);
        setFilteredProducts(customerData);
      } else {
        console.warn("API response is not an array:", customerData);
        setCustomers(PRODUCT_DATA); // Fallback to default data
        setFilteredProducts(PRODUCT_DATA);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError("Failed to load customers");
      // Fallback to default data on error
      setCustomers(PRODUCT_DATA);
      setFilteredProducts(PRODUCT_DATA);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [refreshTrigger]); // Refetch when refreshTrigger changes

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!Array.isArray(customers)) {
      setFilteredProducts([]);
      return;
    }

    const filtered = customers.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.phone.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
  };

  // Update filtered products when customers data changes
  useEffect(() => {
    if (Array.isArray(customers)) {
      setFilteredProducts(customers);
    }
  }, [customers]);

  const handleEdit = (customer) => {
    if (onEditCustomer) {
      onEditCustomer(customer);
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

  const handleDelete = async (customerId) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }

    try {
      const response = await api.delete(`/api/customer/${customerId}`);
      if (response.status === 200 || response.status === 204) {
        // Refresh the table
        fetchCustomers();
      } else {
        console.error("Failed to delete customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  if (loading) {
    return (
      <div className="m-4 bg-blue-950 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8">
        <div className="text-center text-gray-100">Loading customers...</div>
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
        <h2 className="text-xl font-semibold text-gray-100">Customers List</h2>
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
                {t("phone")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {t("address")}
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
                  {product.phone}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.address}
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
export default CustomerTable;
