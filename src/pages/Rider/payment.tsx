import { useState } from "react";

const Payment = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <div>
      {/* Pay Button */}
      <button
        onClick={handleOpenModal}
        className="px-6 py-2 bg-[#175C4F] text-white rounded-full shadow-md hover:bg-black transition"
      >
        Pay My ride fare
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 max-w-sm text-center relative">
            <h2 className="text-xl font-bold mb-4">Under Construction</h2>
            <p className="text-gray-700 mb-6">
              Payment feature is coming soon!
            </p>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 bg-[#175C4F] text-white rounded-full hover:bg-black transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
