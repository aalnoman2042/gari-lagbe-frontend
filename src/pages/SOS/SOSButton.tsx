import { useGetSOSInfoQuery, useTriggerSOSMutation } from "@/redux/auth.api";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
// import { useTriggerSOSMutation, useGetSOSInfoQuery } from "@/redux/sos.api";
import { toast } from "sonner";

const SOSButton = ({ isActiveRide }: { isActiveRide: boolean }) => {
  const [open, setOpen] = useState(false);
  const { data: sosInfo } = useGetSOSInfoQuery(undefined);
  const [triggerSOS, { isLoading }] = useTriggerSOSMutation();

  console.log(sosInfo);
  
  const handleSOS = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await triggerSOS({
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }).unwrap();
          toast.success("SOS triggered successfully!");
        } catch (err) {
          toast.error("Failed to trigger SOS");
        }
      },
      () => toast.error("Failed to get location")
    );
  };

  if (!isActiveRide) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-full shadow-lg animate-pulse"
      >
        SOS
      </button>

      {open && (
        <div className="mt-4 bg-white p-4 rounded-xl shadow-lg w-60">
          <h4 className="font-bold text-red-600 mb-2">Emergency Options</h4>
          <ul className="space-y-2">
            <li>
              <a href="tel:999" className="text-blue-600 hover:underline">
                Call Police
              </a>
            </li>
            {sosInfo?.emergencyContacts?.map((contact: { phone: any; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, i: Key | null | undefined) => (
              <li key={i}>
                <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                  Notify {contact.name}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={handleSOS}
                disabled={isLoading}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
              >
                Share Live Location
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SOSButton;
