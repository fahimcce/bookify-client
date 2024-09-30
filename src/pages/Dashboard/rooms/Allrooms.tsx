import AddaRoomModal from "./AddRoomModal";
import AllRoomsTable from "./AllRoomsTable";

const Allrooms = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center border-b-2 border-gray-300 pb-3 mb-4">
        <h3 className="text-gray-800 md:text-lg font-bold xl:text-2xl">
          Room Management
        </h3>
        <AddaRoomModal />
      </div>
      <div className="bg-white rounded-lg p-4 shadow">
        <AllRoomsTable />
      </div>
    </div>
  );
};

export default Allrooms;
