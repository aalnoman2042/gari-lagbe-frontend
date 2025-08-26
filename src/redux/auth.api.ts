
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
    updateUser: builder.mutation({
      query: (updatedUser) => ({
        url: "/user/updateUser",
        method: "PATCH",
        body: updatedUser
      }),
      // invalidatesTags: ["USER"],
    }),

    // driver section
    driverEarinings: builder.query({
      query: (id) => ({
        url: `driver/driver-earnings/${id}`,
        method: "GET",
      }),
      // invalidatesTags: ["USER"],
    }),
    DriverHIstory: builder.query({
      query: (id) => ({
        url: `driver/${id}/history`,
        method: "GET",
      }),
      // invalidatesTags: ["USER"],
    }),

    // rider section 
     rideRequest: builder.mutation({
      query: (rideInfo) => ({
        url: `/ride/request`,
        method: "POST",
        body: rideInfo
      }),
      // invalidatesTags: ["USER"],
    }),
     riderHistory: builder.query({
      query: (riderId) => ({
        url: `/ride/rider/${riderId}/history`,
        method: "GET",
      }),
      // invalidatesTags: ["USER"],
    }),
     cancelRide: builder.mutation({
      query: (rideId) => ({
        url: `/ride/cancel/${rideId}`,
        method: "PATCH",
      }),
      // invalidatesTags: ["USER"],
    }),

   
  }),
});


export const {
  useRegisterMutation,
  useUserInfoQuery,
  useLoginMutation,
  useLogoutMutation,
  useUpdateUserMutation,


useDriverEariningsQuery,
useDriverHIstoryQuery,


useRiderHistoryQuery,
useRideRequestMutation,
useCancelRideMutation
} = authApi;