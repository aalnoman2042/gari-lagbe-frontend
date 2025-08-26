/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDriverHIstoryQuery, useUserInfoQuery } from "@/redux/auth.api";
import dayjs from "dayjs";

const DriverHistory = () => {
  const { data: driver } = useUserInfoQuery(undefined);
  const driverId = driver?.data?._id;
  const { data: driverHistory, error, isLoading } = useDriverHIstoryQuery(driverId);

  if (isLoading)
    return <div className="text-center py-10 text-gray-500">Loading ride history...</div>;

  if (error)
    return <div className="text-center py-10 text-red-500">Error loading ride history</div>;

  const rides = driverHistory?.data || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-[#175C4F] mb-6">
        Ride History for {driver?.data?.name}
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-[#175C4F] text-white">
            <tr>
              <th className="py-2 px-4 text-left">Pickup</th>
              <th className="py-2 px-4 text-left">Destination</th>
              <th className="py-2 px-4 text-left">Fare (BDT)</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Requested At</th>
              <th className="py-2 px-4 text-left">Accepted At</th>
              <th className="py-2 px-4 text-left">Completed At</th>
            </tr>
          </thead>
          <tbody>
            {rides.length > 0 ? (
              rides.map((ride: any) => (
                <tr key={ride._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{ride.pickupLocation}</td>
                  <td className="py-2 px-4">{ride.destination}</td>
                  <td className="py-2 px-4">{ride.fare}</td>
                  <td className="py-2 px-4 capitalize">{ride.status.replace("_", " ")}</td>
                  <td className="py-2 px-4">
                    {ride.requestedAt ? dayjs(ride.requestedAt).format("YYYY-MM-DD HH:mm") : "-"}
                  </td>
                  <td className="py-2 px-4">
                    {ride.acceptedAt ? dayjs(ride.acceptedAt).format("YYYY-MM-DD HH:mm") : "-"}
                  </td>
                  <td className="py-2 px-4">
                    {ride.completedAt ? dayjs(ride.completedAt).format("YYYY-MM-DD HH:mm") : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-4 px-4 text-center text-gray-500" colSpan={7}>
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

export default DriverHistory;
