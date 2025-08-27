import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#175C4F]">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-gray-400">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-2 rounded-2xl bg-[#175C4F] text-white font-medium shadow-md hover:bg-[#0f3e35] transition"
          >
            Go Home
          </Link>
          <Link
            to="/contact"
            className="px-6 py-2 rounded-2xl bg-yellow-500 text-black font-medium shadow-md hover:bg-yellow-400 transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
