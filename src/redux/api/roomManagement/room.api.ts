/* eslint-disable @typescript-eslint/no-explicit-any */
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
      query: ({
        search,
        range,
        limit,
        sort,
        capacity,
        page,
      }: {
        search?: string;
        range?: string;
        limit?: number;
        sort?: string;
        capacity?: string;
        page?: string;
      }) => {
        const params = new URLSearchParams();
        if (search) {
          params.append("search", search);
        }
        if (range) {
          params.append("range", range);
        }
        if (limit) {
          params.append("limit", String(limit));
        }
        if (sort) {
          params.append("sort", sort);
        }
        if (capacity) {
          params.append("capacity", capacity);
        }
        if (page) {
          params.append("page", page);
        }

        return {
          url: "/rooms",
          method: "GET",
          params: params,
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
      query: (data: any) => {
        return {
          url: `/rooms/${data?._id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["rooms"],
    }),
    // getRoomsForBookings: builder.query({
    //   query: (roomsId: any) => {
    //     return {
    //       url: "/rooms/someRooms",
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["rooms"],
    // }),
  }),
});

export const { useGetAllRoomsQuery, useCreateRoomMutation, useGetAroomsQuery, useDeleteRoomMutation, useUpdateRoomMutation } = roomApi;
