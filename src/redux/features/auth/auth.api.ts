import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
    }),
    register: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllUser: builder.query({
      query: (args: { search?: string; sort: string }) => {
        const params = new URLSearchParams();
        if (args?.search) {
          params.append("search", args.search);
        }
        if (args?.sort) {
          params.append("sort", args.sort);
        }
        return {
          url: "/users",
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),
    getOneUser: builder.query({
      query: (email) => {
        const params = new URLSearchParams();
        if (email) {
          params.append("email", email);
        }
        return {
          url: `/auth/users`,
          method: "GET",
          params,
        };
      },
      providesTags: ["user"],
    }),
    updateStatus: builder.mutation({
      query: (id: string) => {
        console.log(id);
        return {
          url: `/auth/status/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id: string) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetAllUserQuery, useLogInMutation, useRegisterMutation, useUpdateStatusMutation, useDeleteUserMutation, useGetOneUserQuery } =
  authApi;
