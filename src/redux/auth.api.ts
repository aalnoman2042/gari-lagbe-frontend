import { baseApi } from "@/redux/baseApi";
// import type { IResponse, ISendOtp, IVerifyOtp } from "@/types";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: '/user/register',
        method: 'POST',
        body:userInfo,
      }),
    }),
        userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      // providesTags: ["USER"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      // invalidatesTags: ["USER"],
    }),
   
  }),
});


export const {
  useRegisterMutation,
  useUserInfoQuery,
  useLoginMutation,
  useLogoutMutation

} = authApi;