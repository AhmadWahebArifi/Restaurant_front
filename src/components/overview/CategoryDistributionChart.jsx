import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart = ({ data = [] }) => {
  // Use provided data or fallback to empty array
  const chartData = data.length > 0 ? data : [
    { name: "No Categories", value: 1 }
  ];

  return (
    <motion.div
      className=" bg-blue-950 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Menu Category Distribution
      </h2>
      <div className="h-80">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No menu categories available</p>
          </div>
        ) : (
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <PieChart>
              <Pie
                data={chartData}
                cx={"50%"}
                cy={"50%"}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "#4B5563",
                }}
                itemStyle={{ color: "#E5E7EB" }}
                formatter={(value, name) => [value, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};
export default CategoryDistributionChart;
