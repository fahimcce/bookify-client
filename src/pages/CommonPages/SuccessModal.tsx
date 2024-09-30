/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Card, Modal } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { clearBookingSlice } from "../../redux/features/bookings/bookingSlice";

const SuccessModal = ({
  isSuccessModalOpen,
  setIsSuccessModalOpen,
  id,
  total,
  totalRoom,
  totalSlot,
}: {
  isSuccessModalOpen: boolean;
  setIsSuccessModalOpen: any;
  id: string;
  total: number;
  totalRoom: number;
  totalSlot: number;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleViewBookings = () => {
    navigate("/myBookings");
  };

  const handleGoHome = () => {
    dispatch(clearBookingSlice());
    navigate("/");
  };

  const handleOk = () => {
    dispatch(clearBookingSlice());
    setIsSuccessModalOpen(false);
  };

  const handleCancel = () => {
    dispatch(clearBookingSlice());
    setIsSuccessModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Booking Status"
        open={isSuccessModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="success-modal"
        centered
      >
        <div className="flex items-center justify-center">
          <Confetti
            style={{ maxWidth: "100%", height: "50%" }}
            numberOfPieces={300}
            opacity={0.9}
          />
          <Card
            className="p-6 text-center bg-gradient-to-br from-blue-400 to-blue-600 text-white"
            style={{ maxWidth: "700px", width: "100%" }}
          >
            <CheckCircleOutlined className="text-6xl mb-4" />
            <h1 className="text-2xl font-bold mb-4">
              Your Booking is Successful!
            </h1>
            <p className="text-md mb-8">
              We appreciate your choice in using Roomify. Your reservation has
              been confirmed successfully.
            </p>
            <div className="flex flex-col items-start pb-4 gap-2">
              <p className="font-semibold">
                Booking ID: <span className="font-normal">{id}</span>
              </p>
              <p className="font-semibold">
                Total Amount:{" "}
                <span className="font-normal">${total.toFixed(2)}</span>
              </p>
              <p className="font-semibold">
                Rooms Booked: <span className="font-normal">{totalRoom}</span>
              </p>
              <p className="font-semibold">
                Total Slots: <span className="font-normal">{totalSlot}</span>
              </p>
            </div>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <Button
                type="primary"
                size="large"
                className="w-full"
                onClick={handleViewBookings}
              >
                My Bookings
              </Button>
              <Button size="large" className="w-full bg-gray-200 text-gray-800">
                <span onClick={handleGoHome}>Return to Homepage</span>
              </Button>
            </div>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default SuccessModal;
