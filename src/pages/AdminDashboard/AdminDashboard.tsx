import { useState } from "react";
import { Button, Modal } from "antd";
import AddRoomForm from "../../components/ui/AddRoomForm";

const AdminDashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Show modal function
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      {/* Button to open the AddRoomForm */}
      <Button type="primary" onClick={showModal}>
        Add Room
      </Button>

      {/* Modal to display AddRoomForm */}
      <Modal
        title="Add New Room"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // No footer to let form handle actions
        centered
      >
        {/* AddRoomForm component inside the modal */}
        <AddRoomForm />
      </Modal>
    </div>
  );
};

export default AdminDashboard;
