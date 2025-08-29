import curve_image from "../assets/section-curve_about.svg";

const About = () => {
  const cards = [
    {
      img: "https://cdn-icons-png.flaticon.com/512/2331/2331940.png", // ride request icon
      title: "Need a ride quickly?",
      text: "Request a ride instantly and get matched with nearby drivers.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/854/854878.png", // booking icon
      title: "Complicated booking?",
      text: "Book your ride effortlessly with just a few taps on our platform.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // tracking icon
      title: "Track your rides easily",
      text: "See your driver’s location and estimated arrival time in real-time.",
    },
    {
      img: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png", // explore icon
      title: "Explore new destinations",
      text: "Discover new areas and get flexible routes for your trips.",
    },
  ];

  return (
    <div>
     <img src={curve_image} className="w-full mb-[-0.1px]" alt="" />
<section className="bg-[#1B6D5F] py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-4xl font-bold text-white mb-12">
            Why choose our Ride Sharing App?
          </h2>

          {/* Grid Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="mb-4 flex justify-center">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.text}</p>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-16 text-center">
            <p className="text-lg text-white mb-6">
              Are you a driver? <br />
              Click here to access the driver view:
            </p>
            <a
              href="/driver"
              className="inline-block bg-white text-[#175C4F] font-medium px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
            >
              For drivers
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
