import { useEffect } from "react";
import { useAllUsersQuery } from "@/redux/auth.api";

const AllUser = () => {
  const { data, isLoading, isError, refetch } = useAllUsersQuery(undefined);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading users
      </div>
    );
  }

  const users = data?.data || [];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-[#175C4F] text-white";
      case "suspended":
        return "bg-red-500 text-white";
      case "inactive":
        return "bg-gray-300 text-gray-700";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getApprovedColor = (approved: boolean) =>
    approved ? "bg-green-500 text-white" : "bg-yellow-400 text-black";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#175C4F]">All Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-[#E0F7F2]">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Approved</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user: any, index: number) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.role}</td>
                  <td className={`px-4 py-2 border text-center font-semibold rounded ${getStatusColor(user.status)}`}>
                    {user.status}
                  </td>
                  <td className={`px-4 py-2 border text-center font-semibold rounded ${getApprovedColor(user.isApproved)}`}>
                    {user.isApproved ? "Yes" : "No"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500 border">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
