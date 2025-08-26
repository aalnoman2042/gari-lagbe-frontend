/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAllRidesQuery } from "@/redux/auth.api";

const AllRides = () => {
  const { data, isLoading, isError } = useAllRidesQuery(undefined);
console.log(data);

  if (isLoading)
    return <div className="text-center mt-10">Loading rides...</div>;
  if (isError)
    return <div className="text-center mt-10 text-red-500">Error loading rides</div>;

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

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">All Rides</h2>

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
            {data?.data?.length > 0 ? (
              data.data.map((ride: any) => (
                <tr key={ride._id} className={getStatusColor(ride.status)}>
                  <td className="px-4 py-2 border">{ride.rider || "N/A"}</td>
                  <td className="px-4 py-2 border">{ride.driver || "N/A"}</td>
                  <td className="px-4 py-2 border">{ride.pickupLocation}</td>
                  <td className="px-4 py-2 border">{ride.destination}</td>
                  <td className="px-4 py-2 border">{ride.fare} BDT</td>
                  <td className="px-4 py-2 border capitalize">{ride.status}</td>
                  <td className="px-4 py-2 border">{new Date(ride.requestedAt).toLocaleString()}</td>
                  <td className="px-4 py-2 border">{ride.completedAt ? new Date(ride.completedAt).toLocaleString() : "-"}</td>
                </tr>
              ))
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
