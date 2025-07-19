import { useRef, useState, useContext, useEffect } from "react";
import api from "../../axios";
import authContext from "../../store/auth-context";
import OrderItemTable from "./OrderItemTable";

const AddOrderForm = () => {
    const nameInput = useRef();
    const phoneInput = useRef();
    const addressInput = useRef();
    const ctx = useContext(authContext);

    const [customers, setCustomers] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [shirini, setShirini] = useState([]);
    const [khuraka, setKhuraka] = useState([]);
    const [nushaba, setNushaba] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get("/api/order/create").then(res => {
            setCustomers(res.data.customers);
            setStatusList(res.data.status);
            setShirini(res.data.shirini);
            setKhuraka(res.data.khuraka);
            setNushaba(res.data.nushaba);
        });
    }, []);

    const handleAddItem = (itemId, categoryList) => {
        const selected = categoryList.find(item => item.id == itemId);
        if (!selected) return;
        const existing = orderItems.find(item => item.id === selected.id);
        if (existing) return; // avoid duplicates
        setOrderItems(prev => [...prev, { ...selected, amount: 1 }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!ctx.isLogin) return setMessage("Please login first.");

        setLoading(true);
        try {
            const data = {
                customer_name: nameInput.current.value,
                table_number: phoneInput.current.value,
                order_status: addressInput.current.value,
                items: orderItems.map(item => ({
                    id: item.id,
                    quantity: item.amount,
                })),
            };

            const response = await api.post("/api/order", data);
            if (response.status === 200 || response.status === 201) {
                setMessage("Order placed successfully!");
                setOrderItems([]);
                nameInput.current.value = "";
                phoneInput.current.value = "";
                addressInput.current.value = "";
            }
        } catch (err) {
            console.error(err);
            setMessage("Failed to submit order.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap gap-4">
                    <select ref={nameInput} className="input">
                        <option value="">Select Customer</option>
                        {customers.map(c => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                    </select>

                    <input ref={phoneInput} type="text" placeholder="Table Number" className="input" />

                    <select ref={addressInput} className="input">
                        <option value="">Select Order Status</option>
                        {statusList.map((s, i) => (
                            <option key={i} value={s}>{s}</option>
                        ))}
                    </select>

                    {/* Nushaba */}
                    <select onChange={e => handleAddItem(e.target.value, nushaba)} className="input">
                        <option value="">Add Nushaba</option>
                        {nushaba.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>

                    {/* Shirini */}
                    <select onChange={e => handleAddItem(e.target.value, shirini)} className="input">
                        <option value="">Add Shirini</option>
                        {shirini.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>

                    {/* Khuraka */}
                    <select onChange={e => handleAddItem(e.target.value, khuraka)} className="input">
                        <option value="">Add Khuraka</option>
                        {khuraka.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <OrderItemTable items={orderItems} setItems={setOrderItems} />

                {message && <div className="mt-4 text-white">{message}</div>}

                <button type="submit" className="btn mt-4">
                    {loading ? "Ordering..." : "Submit Order"}
                </button>
            </form>
        </div>
    );
};

export default AddOrderForm;
