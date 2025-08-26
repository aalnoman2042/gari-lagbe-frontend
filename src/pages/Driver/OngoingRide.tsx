/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDriverHIstoryQuery, useUpdateRideStatusMutation, useUserInfoQuery } from "@/redux/auth.api";
import { useState } from "react";
import { toast } from "sonner";

const statusOrder = ["accepted", "picked_up", "in_transit", "completed"];

const OngoingRide = () => {
  // Logged-in driver info
  const { data: userData } = useUserInfoQuery(undefined);
  const driverId = userData?.data?._id;

  // Fetch driver rides with tag
  const { data, isLoading, isError, refetch } = useDriverHIstoryQuery(driverId, {
    refetchOnMountOrArgChange: true,
  });

  const [updateRideStatus] = useUpdateRideStatusMutation();
  const [loadingRide, setLoadingRide] = useState<string | null>(null);

  if (isLoading) return <div className="text-center mt-10">Loading ongoing rides...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error loading rides</div>;

  // Only ongoing rides for this driver (exclude completed or cancelled)
  const ongoingRides = data?.data?.filter(
    (ride: any) =>
      ride.driver === driverId && ride.status !== "completed" && ride.status !== "cancelled"
  );

  const handleStatusUpdate = async (rideId: string, currentStatus: string) => {
    const nextStatusIndex = statusOrder.indexOf(currentStatus) + 1;
    if (nextStatusIndex >= statusOrder.length) return;

    const nextStatus = statusOrder[nextStatusIndex];

    try {
      setLoadingRide(rideId);
      await updateRideStatus({ rideId, status: nextStatus }).unwrap();
      toast.success(`Ride status updated to ${nextStatus.replace("_", " ")}`);
      setLoadingRide(null);

      // Refetch rides after update to refresh UI
      refetch();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update status");
      setLoadingRide(null);
    }
  };

  return (
    <div className="flex flex-col items-center py-6 gap-6">
  {ongoingRides && ongoingRides.length > 0 ? (
    ongoingRides.map((ride: any) => {
      const activeStatusIndex = statusOrder.indexOf(ride.status);
      return (
        <div
          key={ride._id}
          className="bg-gradient-to-br from-[#E0F7F2] to-white border border-gray-200 rounded-3xl shadow-lg p-6 w-[80vw] max-w-2xl transition transform hover:scale-[1.02]"
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#175C4F]">Pickup</h2>
            <p className="text-gray-700">{ride.pickupLocation}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#175C4F]">Destination</h2>
            <p className="text-gray-700">{ride.destination}</p>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-800 font-semibold">Fare: {ride.fare} BDT</p>
            <p className="text-gray-500 text-sm">
              Requested: {new Date(ride.requestedAt).toLocaleString()}
            </p>
          </div>

          {/* Status buttons */}
          <div className="flex mt-2 justify-center flex-wrap gap-1">
            {statusOrder.map((status, index) => {
              const isCurrent = index === activeStatusIndex;
              const isNext = index === activeStatusIndex + 1;
              const disabled = !(isCurrent || isNext) || loadingRide === ride._id;

              return (
                <button
                  key={status}
                  disabled={disabled}
                  onClick={() => handleStatusUpdate(ride._id, ride.status)}
                  className={`px-5 py-2 text-sm font-semibold transition-colors border border-gray-300 ${
                    isCurrent
                      ? "bg-[#88b8af] text-white shadow-md"
                      : isNext
                      ? "bg-[#175C4F] text-white hover:bg-black shadow-md"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } rounded-full`}
                >
                  {status.replace("_", " ").toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      );
    })
  ) : (
    <div className="text-center text-gray-500">
      No ongoing rides at the moment
    </div>
  )}
</div>

  );
};

export default OngoingRide;
