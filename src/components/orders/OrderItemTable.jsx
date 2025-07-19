import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import SuccessCard from "../common/SuccessCard";
import api from "../../axios";
import authContext from "../../store/auth-context";

const OrderItemTable = ({
  items = [],
  setItems,
  customerId,
  tableNumber,
  orderStatus,
}) => {
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const ctx = useContext(authContext);

  // Update filtered items when items change
  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(term)
    );
    setFilteredItems(filtered);
  };

  // Remove item from local state only (draft order)
  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQty = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item
      )
    );
  };

  const submitOrder = async () => {
    // Check if user is logged in
    if (!ctx.isLogin) {
      setError("Please login first to submit orders.");
      return;
    }
    setError("");
    const payload = {
      customer_id: customerId,
      table_number: tableNumber,
      order_status: orderStatus,
      items: items.map((item) => ({
        menu_item_id: item.id,
        quantity: item.amount,
        item_price: item.price,
      })),
    };
    console.log(payload);
    try {
      await api.post("/api/order", payload);
      setShowSuccess(true);
      setItems([]); // clear the table
    } catch (error) {
      console.error("Order submission failed:", error);
      setError("Failed to submit order. Please try again.");
    }
  };

  return (
    <motion.div
      className="bg-blue-950 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8 mx-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {error && (
        <div className="px-5 py-2 rounded-lg bg-red-100 text-red-800 mb-4">
          {error}
        </div>
      )}
      {showSuccess && (
        <SuccessCard
          message="Order submitted successfully!"
          duration={2000}
          inPage={true}
          onClose={() => setShowSuccess(false)}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Selected Items</h2>
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

      {filteredItems.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          {searchTerm ? "No items match your search" : "No items selected"}
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {t("name")}
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {t("action")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredItems.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                      <img
                        src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww"
                        alt="Product img"
                        className="size-10 rounded-full"
                      />
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="bg-gray-700 hover:bg-gray-600 border border-gray-600 w-8 h-8 rounded-lg text-white transition-all duration-200 flex items-center justify-center font-semibold text-lg hover:scale-105"
                        >
                          -
                        </button>
                        <span className="min-w-[3rem] text-center font-medium text-gray-100 text-base">
                          {item.amount}
                        </span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="bg-gray-700 hover:bg-gray-600 border border-gray-600 w-8 h-8 rounded-lg text-white transition-all duration-200 flex items-center justify-center font-semibold text-lg hover:scale-105"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex justify-center">
                        <button
                          className="text-red-400 hover:text-red-300 transition-all duration-200 hover:scale-110 p-2 rounded-lg hover:bg-red-400 hover:bg-opacity-10"
                          onClick={() => removeItem(item.id)}
                          title="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              className="inline-flex rounded-full border border-transparent bg-blue-950 px-7 py-3 text-center text-base font-medium text-white shadow-1 hover:bg-blue-700 transition-colors"
              onClick={submitOrder}
            >
              <span className="pr-[10px]">
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
              </span>
              Submit Order
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default OrderItemTable;
