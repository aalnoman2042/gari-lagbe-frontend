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

import { Link } from "react-router";
import Loading from "@/component/common/loading";

const statusOrder = ["accepted", "picked_up", "in_transit", "completed"];

const OngoingRide = () => {
  const { data: userData } = useUserInfoQuery(undefined);
  const role = userData?.data?.role;
  const userId = userData?.data?._id;

  let ridesData;
  let isLoading = false;
  let isError = false;
  let refetch: (() => void) | undefined;

  if (role === "driver") {
    const driverQuery = useDriverHIstoryQuery(userId!, { skip: false });
    ridesData = driverQuery.data?.data;
    isLoading = driverQuery.isLoading;
    isError = driverQuery.isError;
    refetch = driverQuery.refetch;
  } else if (role === "rider") {
    const riderQuery = useGetRiderOngoingRidesQuery(undefined, { skip: false });
    ridesData = riderQuery.data?.data;
    isLoading = riderQuery.isLoading;
    isError = riderQuery.isError;
    refetch = riderQuery.refetch;
  }

  const [updateRideStatus] = useUpdateRideStatusMutation();
  const [loadingRide, setLoadingRide] = useState<string | null>(null);

  if (isLoading) return <Loading></Loading>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error loading rides</div>;

  const ongoingRides = ridesData?.filter(
    (ride: any) => ride.status !== "completed" && ride.status !== "cancelled"
  );

  const handleStatusUpdate = async (rideId: string, currentStatus: string) => {
    const nextIndex = statusOrder.indexOf(currentStatus) + 1;
    if (nextIndex >= statusOrder.length) return;
    const nextStatus = statusOrder[nextIndex];

    try {
      setLoadingRide(rideId);
      await updateRideStatus({ rideId, status: nextStatus }).unwrap();
      toast.success(`Ride status updated to ${nextStatus.replace("_", " ")}`);
      setLoadingRide(null);
      if (refetch) refetch();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update status");
      setLoadingRide(null);
    }
  };

  return (
    <div className="flex flex-col items-center py-6 gap-6">
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

              <div className="flex mt-2 justify-center flex-wrap gap-1">
                {/* Driver buttons */}
                {role === "driver" &&
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
                  })}

                {/* Rider view: only show current status */}
                {role === "rider" && (
                  <span className="px-5 py-2 text-sm font-semibold border border-gray-300 rounded-full bg-gray-200 text-gray-700">
                    {ride.status.replace("_", " ").toUpperCase()}
                  </span>
                )}

                {/* Pay button for rider */}
                {role === "rider" && (
                  <button className="px-6 py-2 bg-[#175C4F] text-white rounded-full shadow-md hover:bg-black transition">
                    <Link to="/rider/ride-ongoing/payment">pay</Link>
                  </button>
                )}
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
