import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import axiosBaseQuery from "./axiosBaseQuery";
// import config from "@/config/config";


export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery: axiosBaseQuery(),
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://gari-lagbe-backend.vercel.app/gari-lagbe/v1',
      credentials: "include"
    }),
  tagTypes: ["USER"],
  endpoints: () => ({}),
});