import { BarChart2, ShoppingBag, Users, Zap, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../axios";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";
import { useTranslation } from "react-i18next";

const OverviewPage = () => {
  const { t, i18n } = useTranslation();
  const ov = t("overview");
  const ts = t("totalorders");
  const cs = t("customer");
  const me = t("menu");
  const re = t("totalrevenue");

  const [dashboardData, setDashboardData] = useState({
    statistics: {
      totalOrders: 0,
      totalCustomers: 0,
      totalMenuItems: 0,
      totalRevenue: 0
    },
    categoryDistribution: [],
    salesByChannel: [],
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/dashboard/statistics");
      console.log("Dashboard data:", response.data);
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 overflow-auto relative z-10">
        <Header title={ov} />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <div className="text-center text-gray-100">Loading dashboard data...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-auto relative z-10">
        <Header title={ov} />
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <div className="text-center text-red-400">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={ov} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard 
            name={ts} 
            icon={Zap} 
            value={dashboardData.statistics.totalOrders.toLocaleString()} 
            color="#6366F1" 
          />
          <StatCard 
            name={cs} 
            icon={Users} 
            value={dashboardData.statistics.totalCustomers.toLocaleString()} 
            color="#8B5CF6" 
          />
          <StatCard 
            name={me} 
            icon={ShoppingBag} 
            value={dashboardData.statistics.totalMenuItems.toLocaleString()} 
            color="#EC4899" 
          />
          <StatCard 
            name={re} 
            icon={DollarSign} 
            value={`$${dashboardData.statistics.totalRevenue.toLocaleString()}`} 
            color="#10B981" 
          />
        </motion.div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart data={dashboardData.recentOrders} />
          <CategoryDistributionChart data={dashboardData.categoryDistribution} />
          <SalesChannelChart data={dashboardData.salesByChannel} />
        </div>
      </main>
    </div>
  );
};
export default OverviewPage;
