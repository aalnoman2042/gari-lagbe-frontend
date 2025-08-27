/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useGetRequestedRideQuery, useUpdateRideStatusMutation } from "@/redux/auth.api";
import Loading from "@/component/common/loading";
import { useGetRequestedRideQuery, useUpdateRideStatusMutation, useUserInfoQuery } from "@/redux/auth.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const AvailableRidesNow = () => {
  const { data, isLoading, isError } = useGetRequestedRideQuery(undefined);
  const [updateRideStatus] = useUpdateRideStatusMutation();
    const { data: driverData } = useUserInfoQuery(undefined); 
  const navigate = useNavigate();

  if (isLoading) return <Loading></Loading>
  if (isError) return <div className="text-center mt-10 text-red-500">Error loading rides</div>;

  const handleAcceptRide = async (rideId: string) => {
    // console.log({  rideId, status: "accepted" });
    if (!driverData?.data?.onlineStatus) {
      toast.error("You must be online to accept rides!");
      return;
    }
    
    try {
      await updateRideStatus({  rideId, status: "accepted" }).unwrap();
      toast.success("Ride accepted successfully!");
      navigate("/driver/ongoing");
    } catch (err : any) {
      console.error(err?.data?.error);
      toast.error("Failed to accept ride  ," + err?.data?.error);
    }
  };

  return (
    <div className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {data?.data?.length > 0 ? (
        data.data.map((ride: any) => (
          <div
            key={ride._id}
            className="bg-white border rounded-xl p-4 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
          >
            <div className="mb-3">
              <h2 className="text-lg font-bold text-[#175C4F] mb-1">Pickup:</h2>
              <p className="text-gray-700">{ride.pickupLocation}</p>
            </div>
            <div className="mb-3">
              <h2 className="text-lg font-bold text-[#175C4F] mb-1">Destination:</h2>
              <p className="text-gray-700">{ride.destination}</p>
            </div>
            <div className="mb-3 flex justify-between items-center">
              <p className="text-gray-800 font-semibold">Fare: {ride.fare} BDT</p>
              <p className="text-gray-500 text-sm">
                {new Date(ride.requestedAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleAcceptRide(ride._id)}
              className="mt-2 bg-[#175C4F] text-white py-2 px-4 rounded-lg hover:bg-black transition duration-300"
            >
              Accept Ride
            </button>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 col-span-full">
          No rides available right now
        </div>
      )}
    </div>
  );
};

export default AvailableRidesNow;
