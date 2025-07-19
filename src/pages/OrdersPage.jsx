import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
// import DailyOrders from "../components/orders/DailyOrders";
// import OrderDistribution from "../components/orders/OrderDistribution";
import OrdersTable from "../components/orders/OrdersTable";
import { useTranslation } from "react-i18next";

const orderStats = {
  totalOrders: "34",
  pendingOrders: "1",
  completedOrders: "33",
  totalRevenue: "$1080",
};

const OrdersPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title={t("orders")} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name={t("totalorders")}
            icon={ShoppingBag}
            value={orderStats.totalOrders}
            color="#6366F1"
          />
          <StatCard
            name={t("pendingorders")}
            icon={Clock}
            value={orderStats.pendingOrders}
            color="#F59E0B"
          />
          <StatCard
            name={t("completeorders")}
            icon={CheckCircle}
            value={orderStats.completedOrders}
            color="#10B981"
          />
          <StatCard
            name={t("totalrevenue")}
            icon={DollarSign}
            value={orderStats.totalRevenue}
            color="#EF4444"
          />
        </motion.div>

        <OrdersTable />
      </main>
    </div>
  );
};
export default OrdersPage;
