/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { toast } from "sonner";
import SOSButton from "../SOS/SOSButton";
import {
  useUserInfoQuery,
  useDriverHIstoryQuery,
  useGetRiderOngoingRidesQuery,
  useUpdateRideStatusMutation,
} from "@/redux/auth.api";

const statusOrder = ["accepted", "picked_up", "in_transit", "completed"];

const OngoingRide = () => {
  // Logged-in user info
  const { data: userData } = useUserInfoQuery(undefined);
  const userId = userData?.data?._id;
  const role = userData?.data?.role;

  // Fetch rides based on role
  const {
    data: driverData,
    isLoading: isDriverLoading,
    isError: isDriverError,
    refetch: refetchDriver,
  } = useDriverHIstoryQuery(userId!, { skip: role !== "driver" });

  const {
    data: riderData,
    isLoading: isRiderLoading,
    isError: isRiderError,
    refetch: refetchRider,
  } = useGetRiderOngoingRidesQuery(undefined, { skip: role !== "rider" });

  console.log(riderData);
  
  const [updateRideStatus] = useUpdateRideStatusMutation();
  const [loadingRide, setLoadingRide] = useState<string | null>(null);

  const isLoading = role === "driver" ? isDriverLoading : isRiderLoading;
  const isError = role === "driver" ? isDriverError : isRiderError;
  const rides = role === "driver" ? driverData?.data : riderData?.data;

  if (isLoading) return <span className="loading loading-spinner loading-max-xl"></span>;
  if (isError)
    console.log(isError);
    
    return <div className="text-center mt-10 text-red-500">Error loading rides</div>;

  // Only ongoing rides (exclude completed or cancelled)
  const ongoingRides = rides?.filter(
    (ride: any) => ride.status !== "completed" && ride.status !== "cancelled"
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
      role === "driver" ? refetchDriver() : refetchRider();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update status");
      setLoadingRide(null);
    }
  };

  return (
    <div className="flex flex-col items-center py-6 gap-6">
      {/* SOS Button visible for active rides */}
      <SOSButton isActiveRide={ongoingRides && ongoingRides.length > 0} />

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

              {/* Role-based buttons */}
              <div className="flex mt-2 justify-center flex-wrap gap-1">
                {role === "driver" ? (
                  statusOrder.map((status, index) => {
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
                  })
                ) : role === "rider" ? (
                  <button className="px-6 py-2 bg-[#175C4F] text-white rounded-full shadow-md hover:bg-black transition">
                    Pay
                  </button>
                ) : null}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500">No ongoing rides at the moment</div>
      )}
    </div>
  );
};

export default OngoingRide;
