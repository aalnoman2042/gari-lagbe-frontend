/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDriverEariningsQuery, useUserInfoQuery } from "@/redux/auth.api";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

const DriverEarnings = () => {
  const { data: driver } = useUserInfoQuery(undefined);
  const driverId = driver?.data?._id;

  const { data: earn, error, isLoading } = useDriverEariningsQuery(driverId);

  const earningsData = useMemo(() => {
    if (!earn?.data?.rides) return { daily: [], weekly: [], monthly: [] };

    const rides = earn.data.rides;

    const dailyMap: Record<string, number> = {};
    const weeklyMap: Record<string, number> = {};
    const monthlyMap: Record<string, number> = {};

    rides.forEach((ride: any) => {
      if (ride.status === "completed") {
        const date = dayjs(ride.completedAt).format("YYYY-MM-DD");
        const week = dayjs(ride.completedAt).format("YYYY-[W]WW");
        const month = dayjs(ride.completedAt).format("YYYY-MM");

        dailyMap[date] = (dailyMap[date] || 0) + ride.fare;
        weeklyMap[week] = (weeklyMap[week] || 0) + ride.fare;
        monthlyMap[month] = (monthlyMap[month] || 0) + ride.fare;
      }
    });

    return {
      daily: Object.entries(dailyMap).map(([date, fare]) => ({ date, earnings: fare })),
      weekly: Object.entries(weeklyMap).map(([week, fare]) => ({ week, earnings: fare })),
      monthly: Object.entries(monthlyMap).map(([month, fare]) => ({ month, earnings: fare })),
    };
  }, [earn]);

  if (isLoading) return <span className="loading loading-spinner loading-max-xl"></span>;;
  if (error) return <h2 className="text-red-700">Error fetching data</h2>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Driver Earnings</h1>

      {/* Daily Earnings */}
      <h2 className="text-lg font-semibold">Daily Earnings</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={earningsData.daily}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="earnings" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>

      {/* Weekly Earnings */}
      <h2 className="text-lg font-semibold mt-8">Weekly Earnings</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={earningsData.weekly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="earnings" fill="#2196F3" />
        </BarChart>
      </ResponsiveContainer>

      {/* Monthly Earnings */}
      <h2 className="text-lg font-semibold mt-8">Monthly Earnings</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={earningsData.monthly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="earnings" fill="#FF9800" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DriverEarnings;
