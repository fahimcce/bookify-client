/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Card } from "antd";
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
        "https://room-booking-server2.vercel.app/api/confirm-payment",
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
      <Card className="p-6 text-center bg-gray-200 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <CardElement className="mb-4" />
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            disabled={!stripe}
            className="w-full mt-4"
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
