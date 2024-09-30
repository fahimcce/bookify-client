import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBooking: builder.mutation({
      query: (data) => {
        return {
          url: "/bookings",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["bookings"],
    }),
    getAllBooking: builder.query({
      query: () => {
        return {
          url: "/bookings",
          method: "GET",
        };
      },
      providesTags: ["bookings"],
    }),
    getMyBookings: builder.query({
      query: () => {
        return {
          url: "/my-bookings",
          method: "GET",
        };
      },
      providesTags: ["bookings"],
    }),
    confirmationBooking: builder.mutation({
      query: (info: { id: string; status: string }) => {
        return {
          url: `/confirm-booking/${info.id}`,
          method: "PUT",
          body: { status: info.status },
        };
      },
      invalidatesTags: ["bookings"],
    }),
    deleteBooking: builder.mutation({
      query: (id: string) => {
        return {
          url: `/bookings/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["bookings"],
    }),
  }),
});

export const { useAddBookingMutation, useGetAllBookingQuery, useConfirmationBookingMutation, useDeleteBookingMutation, useGetMyBookingsQuery } =
  bookingApi;
