import { FaUserAlt, FaCarSide, FaUserShield } from "react-icons/fa"; // Icons import

const Features = () => {
  const features = [
    {
      role: "Rider",
      icon: <FaUserAlt size={36} />,
      items: [
        "Request a ride instantly",
        "Track driver location in real-time",
        "View ride history and fare details",
        "Rate your driver after each ride",
      ],
    },
    {
      role: "Driver",
      icon: <FaCarSide size={36} />,
      items: [
        "Go online/offline to accept rides",
        "View available ride requests nearby",
        "Manage ongoing rides and earnings",
        "Access driver dashboard and stats",
      ],
    },
    {
      role: "Admin",
      icon: <FaUserShield size={36} />,
      items: [
        "Monitor all rides, drivers, and riders",
        "Update ride statuses and resolve issues",
        "View daily, weekly, and monthly reports",
        "Manage users and platform settings",
      ],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-12 text-black">
          Platform Features
        </h2>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#175C4F] text-white p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition transform hover:scale-105 duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{feature.role}</h3>
              <ul className="list-none space-y-3 text-white">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="mt-1 text-xl">✔️</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
