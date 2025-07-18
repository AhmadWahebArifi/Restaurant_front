import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import CustomerForm from "../components/customer/CustomerForm";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import CustomerTable from "../components/customer/CustomerTable";
import SuccessCard from "../components/common/SuccessCard";
import AddOrderForm from "../components/orders/AddOrderForm";

const userStats = {
    totalUsers: 152845,
    newUsersToday: 243,
    activeUsers: 98520,
    churnRate: "2.4%",
};

// {showSuccess && <SuccessCard onClose={() => setShowSuccess(false)} />}
const AddOrder = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleCustomerAdded = useCallback(() => {
        setRefreshTrigger((prev) => prev + 1);
        setShowSuccess(true);
    }, []);

    {
        showSuccess && <SuccessCard onClose={() => setShowSuccess(false)} />;
    }
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Add Orders" />
            <AddOrderForm onCustomerAdded={handleCustomerAdded} />
        </div>
    );
};
export default AddOrder;
