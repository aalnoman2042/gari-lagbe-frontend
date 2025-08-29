import { useGetSOSInfoQuery,  useUserInfoQuery } from "@/redux/auth.api";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import config from "@/config/config";

const SOSButton = ({ isActiveRide }: { isActiveRide: boolean }) => {
  const [open, setOpen] = useState(false);
  const { data: sosInfo } = useGetSOSInfoQuery(undefined);
  // const [triggerSOS, { isLoading }] = useTriggerSOSMutation();
  const navigate = useNavigate();
  const { data: user } = useUserInfoQuery(undefined);


  
  
  

  // Handle SOS button click
  const handleSOSClick = () => {
  if (!sosInfo) {
    toast.error("Loading SOS info, please try again...");
    return;
  }

  // Ensure it's boolean
  const isEnabled = sosInfo?.data?.enableSOS ;

  if (!isEnabled) {
    toast.error("Please enable SOS in your profile first!");
    navigate(`/${user?.data?.role}/sos-update`);
    return;
  }

  setOpen(!open);
};


  // Handle share live location
const handleShareLocation = async () => {
  if (!sosInfo) {
    toast.error("SOS info is loading, try again in a moment");
    return;
  }

  if (!sosInfo?.data?.emergencyContacts || sosInfo?.data?.emergencyContacts === 0) {
    toast.error("No emergency contacts to notify");
    return;
  }

  if (!navigator.geolocation) {
    toast.error("Geolocation not supported");
    return;
  }

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    console.log("User location:", position.coords.latitude, position.coords.longitude);

    const rideLink = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;

    for (const contact of sosInfo?.data?.emergencyContacts) {
      if (!contact.email) continue;
console.log(contact.email);

      try {
        await emailjs.send(
          config.emailjsServiceId,
          config.emailjsTemplateId,
          {
            to_email: contact.email,
            user_name: user?.data?.name,
            location_link: rideLink,
          },
          config.emailjsPublicKey
        
        );
       
      } catch (emailError) {
        console.error(`Failed to send email to ${contact.email}:`, emailError);
      }
    }

    toast.success("Emails sent successfully");
  } catch (err) {
    console.error("Failed to get location or send emails:", err);
    toast.error("Failed to get location or send emails");
  }
};




  if (!isActiveRide) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleSOSClick}
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
            {sosInfo?.emergencyContacts?.map(
              (contact: {
                phone: any;
                email?: string;
                name:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | null
                  | undefined;
              }, i: Key | null | undefined) => (
                <li key={i}>
                  <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                    Notify {contact.name}
                  </a>
                </li>
              )
            )}
            <li>
<button
  onClick={handleShareLocation}
  disabled={!sosInfo}
  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
>
  { !sosInfo ? "Loading..." : "Share Live Location" }
</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SOSButton;
