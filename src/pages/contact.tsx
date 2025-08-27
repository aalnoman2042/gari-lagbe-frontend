import { Link } from "react-router-dom";
import contactImage from "../assets/contact.png";

const Contact = () => {
  return (
    <div className="w-[80%] mx-auto my-10">
   
      {/* Contact Heading */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-[#175C4F] mb-4">Contact With Us</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Need help with your ride or have questions? Reach out to us, and we'll get back to you as soon as possible.
        </p>
      </div>

      {/* Contact Button */}
      <div className="flex justify-center mb-8">
        <button className="bg-[#175C4F] text-white font-semibold py-3 px-6 rounded-lg transition duration-300 hover:bg-black hover:text-white">
          <Link to="/contact" className="w-full h-full flex justify-center items-center">
            Contact Us
          </Link>
        </button>
      </div>

    

      {/* Contact Info Image */}
      <div className="flex justify-center mb-8">
        <img src={contactImage} alt="Contact Us" className="max-w-full h-auto rounded-lg shadow-md" />
      </div>

      {/* Contact Information */}
      <div className="text-center">
        <h4 className="text-xl font-semibold text-[#175C4F]">Our Office Location</h4>
        <p className="text-lg text-gray-600 mt-2">123 Ride Avenue, Chattogram, Bangladesh</p>
        <p className="text-lg text-gray-600 mt-2">Phone: +880 123 456 7890</p>
        <p className="text-lg text-gray-600 mt-2">Email: support@gari-lagbe.com</p>
      </div>
    </div>
  );
};

export default Contact;
