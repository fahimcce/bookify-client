/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Card, Typography } from "antd";
import { toast } from "sonner";
import { useAddBookingMutation } from "../../redux/api/roomManagement/booking.api";
import { useState } from "react";
import SuccessModal from "./SuccessModal";

export type TBookingInfo = {
  phone: string | undefined;
  email: string | undefined;
  room: { _id: string; date: string; slots: string[] | any }[];
  totalAmount: number;
  user: string;
};

const CheckoutForm = ({
  bookingInfo,
  total,
}: {
  bookingInfo: TBookingInfo;
  total: number;
}) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [addBooking] = useAddBookingMutation();
  const [paymentId, setPaymentId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const totalSlots =
    bookingInfo?.room.reduce((acc, item) => acc + item.slots.length, 0) || 0;

  const handleSubmit = async (event: React.FormEvent) => {
    const toastId = toast.loading("Processing your payment...");
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
    });

    if (error) {
      toast.error(error.message, { id: toastId, duration: 4000 });
    } else {
      // Send response to the server for payment confirmation
      const response = await fetch(
        "http://localhost:5000/api/confirm-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentId: paymentMethod.id, total }),
        }
      );
      const paymentResult = await response.json();

      if (paymentResult.success) {
        toast.success(paymentResult.message, { id: toastId });
        setPaymentId(paymentResult?.data?.id);

        const newBookingInfo = {
          ...bookingInfo,
          paymentId: paymentResult?.data?.id,
          paymentTime: paymentResult?.data?.created,
          isConfirmed: "unconfirmed",
        };

        const res: any = await addBooking(newBookingInfo);

        if (res?.error) {
          toast.error(res?.error?.message || res?.error?.data?.message, {
            id: toastId,
            duration: 4000,
          });
        } else {
          toast.success(res?.data?.message, { id: toastId, duration: 4000 });
          setIsSuccessModalOpen(true);
        }
      } else {
        toast.error(paymentResult?.message || paymentResult?.error?.message, {
          id: toastId,
          duration: 4000,
        });
      }
    }
  };

  return (
    <>
      <Card className="p-6 text-center bg-white shadow-lg rounded-lg">
        <Typography.Title level={4} className="mb-4">
          Complete Your Payment
        </Typography.Title>
        <Typography.Paragraph>
          You are about to book {totalSlots} slot(s) for a total of ${total}.
        </Typography.Paragraph>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <CardElement className="mb-4 p-2 border rounded-md bg-gray-100" />
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            disabled={!stripe}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200 ease-in-out"
          >
            Pay Now and Confirm Booking
          </Button>
        </form>
      </Card>
      <SuccessModal
        id={paymentId}
        total={bookingInfo?.totalAmount}
        isSuccessModalOpen={isSuccessModalOpen}
        setIsSuccessModalOpen={setIsSuccessModalOpen}
        totalRoom={bookingInfo?.room?.length}
        totalSlot={totalSlots}
      />
    </>
  );
};

export default CheckoutForm;
