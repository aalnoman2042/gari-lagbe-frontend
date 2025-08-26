import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfoQuery } from "@/redux/auth.api";

const UnauthorizedPage = () => {
  const { data: user, isLoading } = useUserInfoQuery(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (user?.status !== "Blocked" && user?.status !== "Suspended") {
        // If user is NOT blocked or suspended → send back to Home
        navigate("/");
      }
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">Checking account status...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-white to-red-50 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full border border-red-200">
        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
          Account Restricted 🚫
        </h2>
        <p className="text-gray-700 text-center mb-6">
          Your account is currently <span className="font-semibold">{user?.status}</span>.  
          You cannot access the dashboard at this time.
        </p>
        <p className="text-gray-600 text-center mb-6">
          Please contact the administration team to resolve the issue.  
          Click below to go to our contact page and explain your problem.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition-all duration-200"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
