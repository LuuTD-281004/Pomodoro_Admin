"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import { getDashboardInfo } from "@/axios/dashboard";

type ChartItem = {
  label: string;
  total: number;
};

type DashboardSummary = {
  range: string;
  totalUsers: number;
  totalRooms: number;
  totalMoney: number;
  chartData: ChartItem[];
};

export default function OverviewPage() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<"week" | "month" | "quarter" | "year">(
    "week"
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getDashboardInfo(range);
        setData(response);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [range]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );

  if (!data)
    return (
      <div className="text-center text-gray-500 py-10">No data available.</div>
    );

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-8 transition-colors">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-700 dark:text-gray-100">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {data.totalUsers.toLocaleString()}
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-700 dark:text-gray-100">
              Active Rooms
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-green-600 dark:text-green-400">
            {data.totalRooms.toLocaleString()}
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-700 dark:text-gray-100">
              Total Transaction Money
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {data.totalMoney.toLocaleString()} đ
          </CardContent>
        </Card>
      </div>

      {/* Range Selector */}
      <div className="flex justify-end">
        <select
          value={range}
          onChange={(e) => setRange(e.target.value as any)}
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        >
          <option className="bg-gray-900" value="week">This Week</option>
          <option className="bg-gray-900" value="month">This Month</option>
          <option className="bg-gray-900" value="quarter">This Quarter</option>
          <option className="bg-gray-900" value="year">This Year</option>
        </select>
      </div>

      {/* Chart */}
      <Card className="p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-700 dark:text-gray-100">
            Transaction Overview ({range})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data.chartData}>
              <XAxis dataKey="label" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderRadius: "8px",
                  border: "none",
                  color: "#F9FAFB",
                }}
              />
              <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
