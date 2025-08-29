import { Link } from "react-router";

const HeroSection = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)", // ride-sharing background
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
            <Link
              to="/login"
              className="inline-block bg-[#175C4F] hover:bg-black text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition duration-300"
            >
              Book a Ride
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
