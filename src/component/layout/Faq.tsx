import middleTop from "../../assets/_middle-section-top.svg"
import middleBottom from "../../assets/_middle-section-bottom.svg"

const Faq = () => {
  return (


   <div>
    <img src={middleTop} alt="" className="w-full" />
    <img src={middleBottom} alt=""  className="w-full"/>
     <div className="bg-black py-10 text-white">
        
      <div className="max-w-6xl mx-auto md:grid md:grid-cols-2 gap-9 px-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div tabIndex={0} className="collapse collapse-arrow border rounded-box border-[#175C4F]">
            <div className="text-xl font-medium collapse-title text-[#175C4F]">
              How do I request a ride?
            </div>
            <div className="collapse-content text-gray-200">
              <p>Open the app, enter your pickup and destination, and click "Book a Ride". You’ll be instantly matched with a nearby driver.</p>
            </div>
          </div>

          <div tabIndex={0} className="collapse collapse-arrow border rounded-box border-[#175C4F]">
            <div className="text-xl font-medium collapse-title text-[#175C4F]">
              Can I schedule rides in advance?
            </div>
            <div className="collapse-content text-gray-200">
              <p>Yes! You can select a future date and time for your ride, and our system will ensure a driver is available when you need it.</p>
            </div>
          </div>

          <div tabIndex={0} className="collapse collapse-arrow border rounded-box border-[#175C4F]">
            <div className="text-xl font-medium collapse-title text-[#175C4F]">
              How do I pay for rides?
            </div>
            <div className="collapse-content text-gray-200">
              <p>You can pay via in-app wallet, credit/debit cards, or other supported digital payment methods.</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div tabIndex={0} className="collapse collapse-arrow border rounded-box border-[#175C4F]">
            <div className="text-xl font-medium collapse-title text-[#175C4F]">
              What if a driver cancels my ride?
            </div>
            <div className="collapse-content text-gray-200">
              <p>If a driver cancels, the system will instantly match you with another nearby driver. You’ll be notified immediately.</p>
            </div>
          </div>

          <div tabIndex={0} className="collapse collapse-arrow border rounded-box border-[#175C4F]">
            <div className="text-xl font-medium collapse-title text-[#175C4F]">
              Is it safe to use the app?
            </div>
            <div className="collapse-content text-gray-200">
              <p>Yes! All drivers are verified and our app uses secure GPS tracking. You can share your ride status with family or friends for added safety.</p>
            </div>
          </div>

          <div tabIndex={0} className="collapse collapse-arrow border rounded-box border-[#175C4F]">
            <div className="text-xl font-medium collapse-title text-[#175C4F]">
              How can I become a driver?
            </div>
            <div className="collapse-content text-gray-200">
              <p>You can sign up as a driver via the app, submit your documents for verification, and start accepting ride requests once approved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Faq;
