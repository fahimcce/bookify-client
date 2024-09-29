import { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  notification,
  Modal,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";
import { useCreateRoomMutation } from "../../redux/features/room/roomApi";

interface FileType extends UploadFile {
  url?: string; // Optional URL property for uploaded images
}

const AddRoomForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState<FileType[]>([]);
  const [roomName, setRoomName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [pricePerSlot, setPricePerSlot] = useState(0);
  const [amenities, setAmenities] = useState("");
  const [floorNo, setFloorNo] = useState(0);
  const [roomNo, setRoomNo] = useState(0);

  const [createRoom, { isLoading }] = useCreateRoomMutation();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (info: any) => {
    const newFileList: FileType[] = info.fileList.map((file: UploadFile) => ({
      uid: file.uid,
      name: file.name,
      status: file.status,
      url: file.response ? file.response.url : undefined,
      originFileObj: file.originFileObj,
    }));
    setFileList(newFileList);
  };

  const uploadImages = async () => {
    const uploadedImageUrls: string[] = [];

    for (const file of fileList) {
      const formData = new FormData();
      formData.append("image", file.originFileObj as File);

      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=ad07207ae8262ceccee41d12d36d2dda",
        {
          body: formData,
          method: "POST",
        }
      );

      const data = await response.json();

      if (data.success) {
        uploadedImageUrls.push(data.data.url); // Store each uploaded image URL
      } else {
        throw new Error("Image upload failed");
      }
    }

    return uploadedImageUrls; // Return all uploaded image URLs as an array
  };

  const handleSubmit = async () => {
    try {
      const imageUrls = await uploadImages(); // Array of URLs

      const roomDetails = {
        name: roomName,
        capacity,
        pricePerSlot,
        amenities: amenities.split(","),
        floorNo,
        roomNo,
        images: imageUrls, // Pass the array of URLs
      };

      await createRoom(roomDetails).unwrap();
      notification.success({
        message: "Room Added",
        description: "The room has been successfully added.",
      });

      // Reset the form after successful submission
      setIsModalVisible(false);
      setFileList([]);
      setRoomName("");
      setCapacity(0);
      setPricePerSlot(0);
      setAmenities("");
      setFloorNo(0);
      setRoomNo(0);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an error adding the room.",
      });
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Room
      </Button>

      <Modal
        title="Add Room"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={handleSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Images" required>
            <Upload
              beforeUpload={() => false}
              onChange={handleFileChange}
              fileList={fileList}
              accept="image/*"
              multiple={true}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Room Name" required>
            <Input
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name"
            />
          </Form.Item>

          <Form.Item label="Capacity" required>
            <InputNumber
              value={capacity}
              onChange={(value) => setCapacity(value as number)}
              min={1}
              placeholder="Enter capacity"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Price Per Slot" required>
            <InputNumber
              value={pricePerSlot}
              onChange={(value) => setPricePerSlot(value as number)}
              min={0}
              formatter={(value) =>
                `৳ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Amenities" required>
            <Input
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              placeholder="Enter amenities (comma-separated)"
            />
          </Form.Item>

          <Form.Item label="Floor Number" required>
            <InputNumber
              value={floorNo}
              onChange={(value) => setFloorNo(value as number)}
              min={0}
              placeholder="Enter floor number"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Room Number" required>
            <InputNumber
              value={roomNo}
              onChange={(value) => setRoomNo(value as number)}
              min={1}
              placeholder="Enter room number"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddRoomForm;
