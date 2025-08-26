import curve_image from "../assets/section-curve_about.svg"



const About = () => {
  const cards = [
    {
      img: "https://cdn.prod.website-files.com/6582d9069698901c620db43d/6582d9069698901c620db44b_Weltma%CC%88rkte.svg",
      title: "High marketing costs?",
      text: "Use DREASI for effective & cost-effective customer loyalty.",
    },
    {
      img: "https://cdn.prod.website-files.com/6582d9069698901c620db43d/6582d9069698901c620db44a_Verwaltung.svg",
      title: "Complex administration?",
      text: "Make your everyday life easier with the intuitive DREASI platform.",
    },
    {
      img: "https://cdn.prod.website-files.com/6582d9069698901c620db43d/6582d9069698901c620db44d_Sichtbarkeit.svg",
      title: "Fight for visibility?",
      text: "Stand out from the crowd with DREASI and win long-term customers.",
    },
    {
      img: "https://cdn.prod.website-files.com/6582d9069698901c620db43d/6582d9069698901c620db44b_Weltma%CC%88rkte.svg",
      title: "Open up new markets?",
      text: "On the DREASI platform, you can diversify your offerings and open up new perspectives.",
    },
  ];

  return (
    <div>
        <img src={curve_image} alt="" /> 
          <section className="bg-[#1B6D5F] py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold text-white mb-12">
          Do you know this?
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
            Are you not a merchant but a user of the platform? <br />
            Click here to access the user view:
          </p>
          <a
            href="/fur-nutzer"
            className="inline-block bg-white text-[#175C4F] font-medium px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
          >
            For users
          </a>
        </div>
      </div>
    </section>
    </div>
  
  );
};

export default About;
