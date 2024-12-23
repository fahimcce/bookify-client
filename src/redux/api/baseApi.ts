import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
const baseQuery = fetchBaseQuery({
  baseUrl: "https://assignment3-seven-xi.vercel.app/api",

  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set(`authorization`, `Berrer ${token}`);
    }
    return headers;
  },
});
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["rooms", "slots", "user", "bookings"],
  endpoints: () => ({}),
});
