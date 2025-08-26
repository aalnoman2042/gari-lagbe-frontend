
const ContactForm = () => {
    return (
        <div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-semibold text-[#175C4F] mb-4">We'd love to hear from you!</h3>
        <form className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#175C4F]"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#175C4F]"
              placeholder="Enter your email"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#175C4F]"
              placeholder="Write your message here"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#175C4F] text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      </div>
        </div>
    );
};

export default ContactForm;