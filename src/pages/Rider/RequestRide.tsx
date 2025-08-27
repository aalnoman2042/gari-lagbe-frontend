import { useRideRequestMutation } from "@/redux/auth.api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { useNavigate } from "react-router";


import { toast } from "sonner";

const RequestRide = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState("");
  const [requestRide, { isLoading, isError, isSuccess }] = useRideRequestMutation(); // RTK mutation hook
    const navigate = useNavigate()
 const rideInfo = {
    pickupLocation,
    destination,
    fare
 }

//  console.log(rideInfo);
 
 const handleSubmit = async () => {
  if (pickupLocation && destination && fare) {
    try {
      const response = await requestRide(rideInfo);

      if ("data" in response && response.data?.success) {
        toast.success("Ride requested successfully!");
        navigate("/rider/rider-history");
      } 
      else if ("error" in response && "data" in response.error!) {
        // error.data er type properly check kore use korte hobe
        const errorData = (response.error as FetchBaseQueryError).data as {
          success?: boolean;
          error?: string;
        };

        if (errorData?.error) {
          toast.warning(errorData.error);
        } else {
          toast.error("Ride request failed!");
        }

        navigate("/rider/rider-history");
      }

    } catch (error) {
      toast.error("Something went wrong.");
    }
  } else {
    toast.error("Please fill in all fields!");
  }
};


  return (
    <div className="min-h-screen flex flex-col bg-[#f1f1f1] p-6">
      <h1 className="text-3xl text-[#0f4c75] font-bold text-center mb-6">Request a Ride</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-semibold text-[#0f4c75] mb-2">Pickup Location</label>
            <input
              type="text"
              placeholder="Enter pickup location"
              className="w-full p-4 border border-gray-300 rounded-lg"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#0f4c75] mb-2">Destination</label>
            <input
              type="text"
              placeholder="Enter destination"
              className="w-full p-4 border border-gray-300 rounded-lg"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#0f4c75] mb-2">Fare Amount</label>
            <input
              type="number"
              placeholder="Enter fare"
              className="w-full p-4 border border-gray-300 rounded-lg"
              value={fare}
              onChange={(e) => setFare(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-[#175C4F] text-white rounded-lg font-semibold hover:bg-[#45a049] transition"
            disabled={isLoading}
          >
            {isLoading ? "Requesting..." : "Request Ride"}
          </button>

          {isError && <p className="text-red-500 text-center mt-4">Can't request Ride now!</p>}
          {isSuccess && <p className="text-green-500 text-center mt-4">Ride requested successfully!</p>}
        </div>
      </div>
    </div>
  );
};

export default RequestRide;
