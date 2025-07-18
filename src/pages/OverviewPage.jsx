import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

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
          <StatCard name={ts} icon={Zap} value="$12,345" color="#6366F1" />
          <StatCard name={cs} icon={Users} value="1,234" color="#8B5CF6" />
          <StatCard name={me} icon={ShoppingBag} value="567" color="#EC4899" />
        </motion.div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionChart />
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};
export default OverviewPage;
