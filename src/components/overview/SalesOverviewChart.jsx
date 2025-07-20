import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const SalesOverviewChart = ({ data = [] }) => {
  // Use provided data or fallback to empty array
  const chartData = data.length > 0 ? data : [
    { date: "No Data", amount: 0 }
  ];

  return (
    <motion.div
      className=" bg-blue-950 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Recent Orders Overview</h2>

      <div className="h-80">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No recent orders available</p>
          </div>
        ) : (
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey={"date"} stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
                formatter={(value, name) => [`$${value}`, name]}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};
export default SalesOverviewChart;
