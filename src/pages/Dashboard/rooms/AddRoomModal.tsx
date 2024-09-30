/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Col, Modal } from "antd";
import RoomForm from "../../../components/forms/RoomForm";
import RoomInput from "../../../components/forms/RoomInput";

import SelectSingleOrMultiImg from "../../../components/forms/RoomImage";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { uploadImageToCloudinary } from "../../../utils/uploadImagetoCloudinary";
import { TResponse } from "../../../types/ResponseType";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiEdit } from "react-icons/bi";
import { TRoomData } from "../../../types/roomtype";
import {
  createRoomValidation,
  updateRoomValidation,
} from "../../../schemaValidation/createRoomValidation";
import {
  useCreateRoomMutation,
  useUpdateRoomMutation,
} from "../../../redux/api/roomManagement/room.api";
import RoomSelect from "../../../components/forms/RoomSelelct";

const amenitiesOptions = [
  { value: "whiteboard", label: "Whiteboard" },
  { value: "projector", label: "Projector" },
  { value: "videoConferencing", label: "Video Conferencing" },
  { value: "soundSystem", label: "Sound System" },
  { value: "airConditioning", label: "Air Conditioning" },
  { value: "wifi", label: "High-Speed WiFi" },
  { value: "television", label: "Television" },
  { value: "coffeeMachine", label: "Coffee Machine" },
  { value: "printer", label: "Printer" },
  { value: "flipChart", label: "Flip Chart" },
  { value: "loungeArea", label: "Lounge Area" },
  { value: "naturalLight", label: "Natural Light" },
  { value: "catering", label: "Catering Service" },
  { value: "reception", label: "Reception Desk" },
  { value: "parking", label: "Parking Space" },
];

const AddaRoomModal = ({
  isUpdate,
  transformedProducts,
}: {
  isUpdate?: boolean;
  transformedProducts?: TRoomData | any;
}) => {
  const [file, setFile] = useState([]);
  const [addRoom] = useCreateRoomMutation();
  const [updateRoom] = useUpdateRoomMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!transformedProducts) {
      const id = toast.loading(
        isUpdate ? "Updating room..." : "Creating room..."
      );
      const imageUrl = [];

      // Upload images to Cloudinary
      for (const image of file) {
        const imgurl = await uploadImageToCloudinary(image);
        imageUrl.push(imgurl);
      }

      const roomData = {
        ...data,
        roomImg: imageUrl,
      };
      const res = (await addRoom(roomData)) as TResponse<any>;
      res.error
        ? toast.error(res.error.data.message, { id })
        : toast.success(res.data.message, { id });
      setIsModalOpen(false);
    } else {
      const updatdata = { ...data, _id: transformedProducts._id as string };
      try {
        const res = (await updateRoom(updatdata)) as TResponse<any>;
        res.error
          ? toast.error(res.error.data.message)
          : toast.success(res.data.message);
        setIsModalOpen(false);
      } catch {
        toast.error("Error updating room.");
      }
    }
  };

  const validateData = isUpdate ? updateRoomValidation : createRoomValidation;

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className="bg-blue-600 hover:bg-blue-700 transition"
      >
        {isUpdate ? <BiEdit size={20} /> : "Create Room"}
      </Button>
      <Modal
        title={isUpdate ? "Update Room" : "Add New Room"}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Col span={24}>
          <RoomForm
            onSubmit={handleSubmit}
            resolver={zodResolver(validateData)}
          >
            <RoomInput
              name="name"
              placeholder="Enter Room Name"
              label="Room Name"
              defaultValue={isUpdate ? transformedProducts?.name : ""}
            />
            <div className="flex justify-between gap-4">
              <RoomInput
                type="number"
                name="roomNo"
                placeholder="Enter Room No"
                label="Room No"
                defaultValue={isUpdate ? transformedProducts?.roomNo : ""}
              />
              <RoomInput
                type="number"
                name="floorNo"
                placeholder="Enter Floor No"
                label="Floor No"
                defaultValue={isUpdate ? transformedProducts?.floorNo : ""}
              />
            </div>
            <div className="flex justify-between gap-4">
              <RoomInput
                type="number"
                name="capacity"
                placeholder="Enter Capacity"
                label="Capacity"
                defaultValue={isUpdate ? transformedProducts?.capacity : ""}
              />
              <RoomInput
                type="number"
                name="pricePerSlot"
                placeholder="Enter Price"
                label="Price Per Slot"
                defaultValue={isUpdate ? transformedProducts?.pricePerSlot : ""}
              />
            </div>
            <RoomSelect
              options={amenitiesOptions}
              mode="multiple"
              name="amenities"
              placeholder="Select Amenities"
              label="Amenities"
              defaultValue={transformedProducts?.amenities}
            />
            {!isUpdate && (
              <SelectSingleOrMultiImg
                file={file}
                setFile={setFile}
                multiple={true}
                title="Upload Images"
                label="Room Images"
              />
            )}
            <Button
              htmlType="submit"
              className="bg-green-600 hover:bg-green-700 text-white md:px-6 mb-4"
            >
              {isUpdate ? "Update Room" : "Add Room"}
            </Button>
          </RoomForm>
        </Col>
      </Modal>
    </>
  );
};

export default AddaRoomModal;
