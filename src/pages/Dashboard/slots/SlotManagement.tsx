
import AllslotPage from "./AllslotPage";
import CreateSlotModal from "./CreateSlotModal";



const SlotManagement = () => {

    return (
        <div>
            <div className="flex justify-between items-center border p-2 rounded">
                <h3 className="md:text-lg font-semibold xl:text-2xl">All Slots</h3>
                <CreateSlotModal />
            </div>
            <div>
                <AllslotPage />
            </div>
        </div>
    )
}

export default SlotManagement