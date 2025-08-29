/* eslint-disable @typescript-eslint/no-unused-vars */
import Loading from "@/component/common/loading";
import { authApi, useCancelRideMutation, useRiderHistoryQuery, useUserInfoQuery } from "@/redux/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";

const RiderHistory = () => {
  const { data: rider } = useUserInfoQuery(undefined);
  const riderId = rider?.data?._id;

  const { data: riderHistory, error, isLoading, isSuccess } = useRiderHistoryQuery(riderId);
  const [cancelRide] = useCancelRideMutation(); // mutation to cancel ride
  const dispatch = useAppDispatch();

  const handleCancel = async (rideId: string) => {
    try {
      await cancelRide(rideId).unwrap();
      toast.message("Your ride has been cancelled");
      dispatch(authApi.util.resetApiState());
    } catch (err) {
      console.error(err);
      alert("Failed to cancel ride");
    }
  };

  if (isLoading) return <Loading></Loading>;
  if (error) return <div className="text-center mt-10 text-red-500">Error loading history</div>;

  return (
    <div className="p-5 text-[#175C4F]">
      <h2 className="text-2xl font-bold mb-5">Rider History for {rider?.data?.name}</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-white">
          <thead>
            <tr className="bg-[#175C4F] text-white ">
              <th className="px-4 py-2 border">Pickup</th>
              <th className="px-4 py-2 border">Destination</th>
              <th className="px-4 py-2 border">Fare</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Requested At</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {isSuccess && riderHistory?.data?.length > 0 ? (
              riderHistory.data.map((ride: any) => {
                let rowColor = "";
                if (ride.status === "requested") rowColor = "bg-yellow-200";
                else if (ride.status === "completed") rowColor = "bg-green-200";
                else if (ride.status === "cancelled") rowColor = "bg-red-200";

                const requestedAt = new Date(ride.requestedAt).toLocaleString();

                return (
                  <tr key={ride._id} className={`${rowColor}`}>
                    <td className="px-4 py-2 border">{ride.pickupLocation}</td>
                    <td className="px-4 py-2 border">{ride.destination}</td>
                    <td className="px-4 py-2 border">{ride.fare} BDT</td>
                    <td className="px-4 py-2 border capitalize">{ride.status}</td>
                    <td className="px-4 py-2 border">{requestedAt}</td>
                    <td className="px-4 py-2 border">
                      {ride.status === "requested" && (
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => handleCancel(ride._id)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="px-4 py-2 border text-center" colSpan={6}>
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

export default RiderHistory;
