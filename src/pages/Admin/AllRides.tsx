/* eslint-disable @typescript-eslint/no-unused-vars */
import Loading from "@/component/common/loading";
import { useAllRidesQuery, useAllRidersQuery, useAllDriversQuery } from "@/redux/auth.api";

const AllRides = () => {
  const { data: rides, isLoading: ridesLoading, isError: ridesError } = useAllRidesQuery(undefined);
  const { data: riders, isLoading: ridersLoading } = useAllRidersQuery(undefined);
  const { data: drivers, isLoading: driversLoading } = useAllDriversQuery(undefined);

  if (ridesLoading || ridersLoading || driversLoading)
    return (
     <Loading></Loading>
    );

  if (ridesError) return <div className="text-center mt-10 text-red-500">Error loading rides</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "requested":
        return "bg-yellow-200";
      case "accepted":
        return "bg-blue-200";
      case "completed":
        return "bg-green-200";
      case "cancelled":
        return "bg-red-200";
      default:
        return "bg-gray-200";
    }
  };

  // Helper to get user info by ID
  const getUserById = (id: string, type: "rider" | "driver") => {
    if (!id) return { name: "N/A", email: "N/A" };
    const list = type === "rider" ? riders?.data : drivers?.data;
    const user = list?.find((u: any) => u._id === id);
    return user || { name: "N/A", email: "N/A" };
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5 text-[#175C4F]">All Rides</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Rider</th>
              <th className="px-4 py-2 border">Driver</th>
              <th className="px-4 py-2 border">Pickup Location</th>
              <th className="px-4 py-2 border">Destination</th>
              <th className="px-4 py-2 border">Fare</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Requested At</th>
              <th className="px-4 py-2 border">Completed At</th>
            </tr>
          </thead>
          <tbody>
            {rides?.data?.length > 0 ? (
              rides.data.map((ride: any) => {
                const rider = getUserById(ride.rider, "rider");
                const driver = getUserById(ride.driver, "driver");

                return (
                  <tr key={ride._id} className={getStatusColor(ride.status)}>
                    {/* Rider */}
                    <td className="px-4 py-2 border">
                      <div className="flex flex-col">
                        <span className="font-semibold">{rider.name}</span>
                        <span className="text-sm text-gray-500">{rider.email}</span>
                        <span className="text-sm text-gray-500">{rider._id}</span>
                      </div>
                    </td>

                    {/* Driver */}
                    <td className="px-4 py-2 border">
                      <div className="flex flex-col">
                        <span className="font-semibold">{driver.name}</span>
                        <span className="text-sm text-gray-500">{driver.email}</span>
                        <span className="text-sm text-gray-500">{driver._id}</span>
                      </div>
                    </td>

                    {/* Pickup */}
                    <td className="px-4 py-2 border">{ride.pickupLocation}</td>

                    {/* Destination */}
                    <td className="px-4 py-2 border">{ride.destination}</td>

                    {/* Fare */}
                    <td className="px-4 py-2 border">{ride.fare} BDT</td>

                    {/* Status */}
                    <td className="px-4 py-2 border capitalize">{ride.status}</td>

                    {/* Requested At */}
                    <td className="px-4 py-2 border">{new Date(ride.requestedAt).toLocaleString()}</td>

                    {/* Completed At */}
                    <td className="px-4 py-2 border">
                      {ride.completedAt ? new Date(ride.completedAt).toLocaleString() : "-"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="px-4 py-2 border text-center" colSpan={8}>
                  No rides found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRides;
