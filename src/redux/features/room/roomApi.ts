import { baseApi } from "../../api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation({
      query: (data) => {
        return {
          url: "/rooms",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["rooms"],
    }),
    getAllRooms: builder.query({
      query: () => {
        return {
          url: "/rooms",
          method: "GET",
        };
      },
      providesTags: ["rooms"],
    }),
    getArooms: builder.query({
      query: (id) => {
        return {
          url: `/rooms/${id}`,
          method: "GET",
        };
      },
      providesTags: ["rooms"],
    }),
    deleteRoom: builder.mutation({
      query: (id) => {
        return {
          url: `/rooms/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["rooms"],
    }),
    updateRoom: builder.mutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (data: any) => {
        return {
          url: `/rooms/${data?._id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["rooms"],
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useCreateRoomMutation,
  useGetAroomsQuery,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} = roomApi;
