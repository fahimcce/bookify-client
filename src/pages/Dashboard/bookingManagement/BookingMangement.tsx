import AllBooking from "./AllBooking";

const BookingManagement = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex justify-between items-center bg-white border shadow-md p-4 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-gray-800 md:text-2xl">
          Manage Your Bookings
        </h3>
        {/* <CreateSlotModal /> */}
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <AllBooking />
      </div>
    </div>
  );
};

export default BookingManagement;
