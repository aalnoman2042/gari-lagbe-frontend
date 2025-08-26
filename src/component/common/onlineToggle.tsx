import { useState } from "react";
import { useDriverOnlineStatusMutation } from "@/redux/auth.api";
import { toast } from "sonner";

interface Props {
  driverId: string;
  currentStatus: boolean; // Initial onlineStatus from backend
}

export const OnlineToggle: React.FC<Props> = ({ driverId, currentStatus }) => {
  const [online, setOnline] = useState(currentStatus);
  const [driverOnlineStatus, { isLoading }] = useDriverOnlineStatusMutation();

  const handleToggle = async () => {
    const newStatus = !online;
    setOnline(newStatus); // UI update immediately

    try {
      await driverOnlineStatus(driverId).unwrap(); // backend call
      toast.success(`You are now ${newStatus ? "Online" : "Offline"}`);
    } catch (error) {
      setOnline(!newStatus); // revert if failed
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`px-2 py-1 rounded ${
          online ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
        }`}
      >
        {online ? "Online" : "Offline"}
      </span>
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className="px-3 py-1 bg-[#175C4F] text-white rounded hover:bg-black transition"
      >
        Toggle
      </button>
    </div>
  );
};
