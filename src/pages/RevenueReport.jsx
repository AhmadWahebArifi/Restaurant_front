import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import SalesOverviewChart from "../components/sales/SalesOverviewChart";
import PaymentTable from "../components/payment/PaymentTable";
import { useTranslation } from "react-i18next";
import PaymentForm from "../components/payment/PaymentForm";
import Revenue from "../components/payment/Revenue";

const salesStats = {
    totalRevenue: "$1034",
};

const RevenueReport = () => {
    const [t] = useTranslation();
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title={t("Revenue")} />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* <StatCard
                        name={t("totalrevenue")}
                        icon={DollarSign}
                        value={salesStats.totalRevenue}
                        color="#6366F1"
                    /> */}
                </motion.div>

                {/* <PaymentForm /> */}
                <Revenue />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"></div>
            </main>
        </div>
    );
};
export default RevenueReport;
