import { useContext, useState } from "react";
import SuccessCard from "../common/SuccessCard";
import api from "../../axios";
import authContext from "../../store/auth-context";

const OrderItemTable = ({ items = [], setItems, customerId, tableNumber, orderStatus }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState("");
    const ctx = useContext(authContext);
    const removeItem = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const increaseQty = (id) => {
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, amount: item.amount + 1 } : item
            )
        );
    };

    const decreaseQty = (id) => {
        setItems(prev =>
            prev.map(item =>
                item.id === id && item.amount > 1
                    ? { ...item, amount: item.amount - 1 }
                    : item
            )
        );
    };

    const submitOrder = async () => {
        // Check if user is logged in
        if (!ctx.isLogin) {
            setError("Please login first to add customers.");
            return;
        }
        setError("");
        const payload = {
            customer_id: customerId,
            table_number: tableNumber,
            order_status: orderStatus,
            items: items.map(item => ({
                menu_item_id: item.id,
                quantity: item.amount,
                item_price: item.price
            }))
        };
        console.log(payload);
        try {
            await api.post("/api/order", payload);
            setShowSuccess(true);
            setItems([]); // clear the table
        } catch (error) {
            console.error("Order submission failed:", error);
            setError("Failed to add customer. Please try again.");
        }
    };

    return (
        <div className="bg-gray-800 text-white p-4 mt-6 rounded-md">
            {error && (
                <div className="px-5 py-2 rounded-lg bg-red-100 text-red-800">
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
            <h2 className="text-lg mb-4">Selected Items</h2>
            {items.length === 0 ? (
                <p>No items selected</p>
            ) : (
                <>
                    <table className="w-full mb-4">
                        <thead>
                            <tr>
                                <th className="text-left">Name</th>
                                <th className="text-center">Qty</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td className="text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => decreaseQty(item.id)}
                                                className="bg-gray-600 px-2 py-1 rounded"
                                            >
                                                -
                                            </button>
                                            <span>{item.amount}</span>
                                            <button
                                                onClick={() => increaseQty(item.id)}
                                                className="bg-gray-600 px-2 py-1 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="text-red-400"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        className="bg-blue-600 px-4 py-2 rounded"
                        onClick={submitOrder}
                    >
                        Submit Order
                    </button>
                </>
            )}


        </div>
    );
};

export default OrderItemTable;
