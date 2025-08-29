import { useNavigate } from "react-router-dom";
import { useUserInfoQuery } from "@/redux/auth.api";

const HeroSection = () => {
  const navigate = useNavigate();
  const { data: user } = useUserInfoQuery(undefined);

  // Button click handlers
  const handleBookRide = () => {
    if (!user?.data) {
      navigate("/login");
    } else if (user.data.role === "driver") {
      navigate("/driver");
    } else if(user.data.role === "rider"){
      navigate("/rider");
    }
    else
      navigate("/unauthorized")
  };

  const handleBecomeDriver = () => {
    if (!user?.data) {
      navigate("/login");
    } else if (user.data.role === "driver") {
      navigate("/driver");
    } else if(user.data.role === "rider"){
      navigate("/rider");
    }
    else
      navigate("/unauthorized")
  };

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-black/50"></div>
        <div className="hero-content text-center text-white">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold">
              Get Your Ride Instantly
            </h1>
            <p className="mb-8 text-lg">
              Request a ride, track your driver in real-time, and reach your destination safely and quickly.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleBookRide}
                className="bg-[#175C4F] hover:bg-black text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition duration-300"
              >
                Book a Ride
              </button>
              <button
                onClick={handleBecomeDriver}
                className="bg-black hover:bg-[#175C4F] text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition duration-300"
              >
                Become a Driver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

