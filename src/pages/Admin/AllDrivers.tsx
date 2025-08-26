/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAllDriversQuery, useApproveDriverMutation, useSuspendDriverMutation } from "@/redux/auth.api";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const AllDrivers = () => {
  const { data, isLoading, isError } = useAllDriversQuery(undefined);
  const [approveDriver] = useApproveDriverMutation();
  const [suspendDriver] = useSuspendDriverMutation();

  const [drivers, setDrivers] = useState<any[]>([]);

  // Populate local state when data arrives
  useEffect(() => {
    if (data?.data) {
      setDrivers(data.data);
    }
  }, [data]);

  const handleToggleApproval = async (driverId: string) => {
    try {
      setDrivers(prev => 
        prev.map(d => d._id === driverId ? { ...d, approved: !d.approved } : d)
      );
      await approveDriver(driverId).unwrap();
      toast.success("Driver approval status updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update approval status");
      // revert on failure
      setDrivers(prev => 
        prev.map(d => d._id === driverId ? { ...d, approved: !d.approved } : d)
      );
    }
  };

  const handleToggleSuspend = async (driverId: string) => {
    try {
      setDrivers(prev => 
        prev.map(d => d._id === driverId ? { ...d, status: d.status === "suspended" ? "active" : "suspended" } : d)
      );
      await suspendDriver(driverId).unwrap();
      toast.success("Driver suspension status updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update suspension status");
      // revert on failure
      setDrivers(prev => 
        prev.map(d => d._id === driverId ? { ...d, status: d.status === "suspended" ? "active" : "suspended" } : d)
      );
    }
  };

  if (isLoading)
    return <div className="text-center mt-10">Loading drivers...</div>;
  if (isError)
    return <div className="text-center mt-10 text-red-500">Error loading driver data</div>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">All Drivers</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Driver Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Online Status</th>
              <th className="px-4 py-2 border">Approval</th>
              <th className="px-4 py-2 border">Suspension</th>
              <th className="px-4 py-2 border">Account Created</th>
            </tr>
          </thead>
          <tbody>
            {drivers.length > 0 ? (
              drivers.map((driver) => (
                <tr key={driver._id}>
                  <td className="px-4 py-2 border">{driver.name || "N/A"}</td>
                  <td className="px-4 py-2 border">{driver.email || "N/A"}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded ${
                        driver.onlineStatus ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {driver.onlineStatus ? "Online" : "Offline"}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      className={`px-3 py-1 rounded text-white ${
                        driver.approved ? "bg-[#175C4F] hover:bg-black" : "bg-red-500 hover:bg-red-700"
                      }`}
                      onClick={() => handleToggleApproval(driver._id)}
                    >
                      {driver.approved ? "Unapprove" : "Approve"}
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      className={`px-3 py-1 rounded text-white ${
                        driver.status === "suspended" ? "bg-red-500 hover:bg-red-700" : "bg-yellow-500 hover:bg-yellow-700"
                      }`}
                      onClick={() => handleToggleSuspend(driver._id)}
                    >
                      {driver.status === "suspended" ? "Unsuspend" : "Suspend"}
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(driver.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 border text-center" colSpan={6}>
                  No drivers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDrivers;
