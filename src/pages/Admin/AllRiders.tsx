/* eslint-disable @typescript-eslint/no-unused-vars */

import { useAllRidersQuery, useBlockUserMutation, useUnBlockUserMutation } from "@/redux/auth.api";
import { toast } from "sonner";

const AllRiders = () => {
  const { data, isLoading, isError } = useAllRidersQuery(undefined);
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnBlockUserMutation();

  const handleToggleBlock = async (rider: any) => {
    try {
      if (rider.status === "active") {
        await blockUser(rider._id).unwrap();
        toast.success("Rider blocked successfully!");
      } else {
        await unblockUser(rider._id).unwrap();
        toast.success("Rider unblocked successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update rider status");
    }
  };

  if (isLoading)
    return <span className="loading loading-spinner loading-max-xl"></span>;;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading rider data
      </div>
    );

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">All Riders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Rider Name</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">block/unblock</th>
              <th className="px-4 py-2 border">Account Created</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.length > 0 ? (
              data.data.map((rider: any) => {
            

                return (
                  <tr key={rider._id} >
                    <td className="px-4 py-2 border">{rider.name || "N/A"}</td>
                    <td className="px-4 py-2 border capitalize">{rider.status}</td>
                    <td className="px-4 py-2 border">
                      <button
                        className="px-3 py-1 bg-[#175C4F] text-white rounded hover:bg-black"
                        onClick={() => handleToggleBlock(rider)}
                      >
                        {rider.status === "active" ? "Block" : "Unblock"}
                      </button>
                    </td>
                    <td className="px-4 py-2 border">
                      {new Date(rider.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="px-4 py-2 border text-center" colSpan={4}>
                  No riders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRiders;
