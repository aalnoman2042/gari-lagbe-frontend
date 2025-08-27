/* eslint-disable @typescript-eslint/no-unused-vars */
import Loading from "@/component/common/loading";
import { useAllRidesQuery, useAllDriversQuery } from "@/redux/auth.api";
import dayjs from "dayjs";
import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const AdminAnalytics = () => {
  const { data: ridesRes, isLoading: ridesLoading, isError: ridesError } = useAllRidesQuery(undefined);
  const { data: driversRes, isLoading: driversLoading, isError: driversError } = useAllDriversQuery(undefined);



  const rides = ridesRes?.data || [];
  const drivers = driversRes?.data || [];

  const {
    totalRides,
    requestedRides,
    acceptedRides,
    inTransitRides,
    completedRides,
    cancelledRides,
    totalDrivers,
    onlineDrivers,
    dailyEarnings,
    topDrivers,
  } = useMemo(() => {
    // Counts by status
    const statusCount = {
      requested: 0,
      accepted: 0,
      picked_up: 0, // if you track
      in_transit: 0,
      completed: 0,
      cancelled: 0,
    } as Record<string, number>;

    // earnings by day and driver
    const dailyMap: Record<string, number> = {};
    const driverEarnMap: Record<string, number> = {};

    for (const r of rides) {
      const st = r.status as string;
      if (statusCount[st] !== undefined) statusCount[st] += 1;

      if (st === "completed") {
        const dateKey = dayjs(r.completedAt ?? r.updatedAt ?? r.createdAt).format("YYYY-MM-DD");
        dailyMap[dateKey] = (dailyMap[dateKey] || 0) + (Number(r.fare) || 0);

        if (r.driver) {
          const dId = typeof r.driver === "string" ? r.driver : r.driver?._id;
          driverEarnMap[dId] = (driverEarnMap[dId] || 0) + (Number(r.fare) || 0);
        }
      }
    }

    // build daily earnings array (sorted by date)
    const dailyEarnings = Object.entries(dailyMap)
      .map(([date, earnings]) => ({ date, earnings }))
      .sort((a, b) => (a.date < b.date ? -1 : 1));

    // map driver earnings to driver name
    const driverNameById: Record<string, string> = {};
    for (const d of drivers) {
      driverNameById[d._id] = d.name || d.email || d._id;
    }
    const topDrivers = Object.entries(driverEarnMap)
      .map(([driverId, earnings]) => ({
        driverId,
        name: driverNameById[driverId] || driverId,
        earnings,
      }))
      .sort((a, b) => b.earnings - a.earnings)
      .slice(0, 5);

    const onlineDrivers = drivers.filter((d: any) => d.onlineStatus === true).length;

    return {
      totalRides: rides.length,
      requestedRides: statusCount.requested || 0,
      acceptedRides: statusCount.accepted || 0,
      inTransitRides: (statusCount.in_transit || 0) + (statusCount.picked_up || 0),
      completedRides: statusCount.completed || 0,
      cancelledRides: statusCount.cancelled || 0,
      totalDrivers: drivers.length,
      onlineDrivers,
      dailyEarnings,
      topDrivers,
    };
  }, [rides, drivers]);

  if (ridesLoading || driversLoading) {
    return (
        <Loading></Loading>


    );
  }

  if (ridesError || driversError) {
    return (
      <div className="p-6">
        <p className="text-red-600">Failed to load analytics.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-[#175C4F]">Admin Analytics</h1>
        <span className="text-sm text-gray-500">
          Updated: {dayjs().format("MMM D, YYYY h:mm A")}
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        <KpiCard title="Total Rides" value={totalRides} badge="All" />
        <KpiCard title="Requested" value={requestedRides} badge="Pending" badgeClass="bg-yellow-100 text-yellow-700" />
        <KpiCard title="Accepted / In Transit" value={acceptedRides + inTransitRides} badge="Active" badgeClass="bg-blue-100 text-blue-700" />
        <KpiCard title="Completed" value={completedRides} badge="Done" badgeClass="bg-green-100 text-green-700" />
        <KpiCard title="Cancelled" value={cancelledRides} badge="Stopped" badgeClass="bg-red-100 text-red-700" />
        <KpiCard title="Drivers (Online)" value={`${totalDrivers} (${onlineDrivers})`} badge="Drivers" />
      </div>

      {/* Daily Earnings (Bar) */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
        <h2 className="text-lg font-semibold mb-4 text-[#175C4F]">Daily Earnings</h2>
        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyEarnings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="earnings" name="Earnings (BDT)" fill="#175C4F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Drivers by Earnings */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5">
        <h2 className="text-lg font-semibold mb-4 text-[#175C4F]">Top Drivers by Earnings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 border text-left">#</th>
                <th className="px-4 py-3 border text-left">Driver</th>
                <th className="px-4 py-3 border text-left">Driver ID</th>
                <th className="px-4 py-3 border text-left">Earnings (BDT)</th>
              </tr>
            </thead>
            <tbody>
              {topDrivers.length > 0 ? (
                topDrivers.map((d, idx) => (
                  <tr key={d.driverId} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border">{idx + 1}</td>
                    <td className="px-4 py-3 border font-medium">{d.name}</td>
                    <td className="px-4 py-3 border text-gray-600">{d.driverId}</td>
                    <td className="px-4 py-3 border font-semibold text-[#175C4F]">{d.earnings}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-3 border text-center" colSpan={4}>
                    No data yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminAnalytics;

/** Small stat card */
const KpiCard = ({
  title,
  value,
  badge,
  badgeClass = "bg-[#175C4F]/10 text-[#175C4F]",
}: {
  title: string;
  value: number | string;
  badge?: string;
  badgeClass?: string;
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
        {badge ? (
          <span className={`text-xs px-2 py-1 rounded-full ${badgeClass}`}>{badge}</span>
        ) : null}
      </div>
      <div className="mt-3 text-3xl font-bold text-[#175C4F]">{value}</div>
    </div>
  );
};
