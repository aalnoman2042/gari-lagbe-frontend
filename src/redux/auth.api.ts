
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
    driverOnlineStatus: builder.mutation({
      query: (id) => ({
        url: `/driver/availability/${id}`,
        method: "PATCH",
      }),
      // invalidatesTags: ["USER"],
    }),
    getRequestedRide: builder.query({
      query: () => ({
        url: `/driver/requestedRide`,
        method: "GET",
      }),
      // invalidatesTags: ["USER"],
    }),
    updateRideStatus: builder.mutation({
      query: ({rideId, status}) => ({
        url: `/driver/ride-status/${rideId}`,
        method: "PATCH",
        body: {status: status}
      }),
       invalidatesTags: ["USER"],
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
     getRiderOngoingRides: builder.query<any, void>({
      query: () => ({
        url: "/ride/ongoingRides",
        method: "GET",
      }),
      // providesTags: ["RiderOngoingRides"],
    }),

    // Admin section 
      allRiders: builder.query({
      query: () => ({
        url: `/admin/riders`,
        method: "GET",
      }),
      // invalidatesTags: ["USER"],
    }),
      blockUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}/block`,
        method: "PATCH",
      }),
      // invalidatesTags: ["USER"],
    }),
      unBlockUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}/unblock`,
        method: "PATCH",
      }),
      // invalidatesTags: ["USER"],
    }),
   
      approveDriver: builder.mutation({
      query: (id) => ({
        url: `/admin/drivers/${id}/approve`,
        method: "PATCH",
      }),
      // invalidatesTags: ["USER"],
    }),
      suspendDriver: builder.mutation({
      query: (id) => ({
        url: `/admin/drivers/${id}/suspend`,
        method: "PATCH",
      }),
      // invalidatesTags: ["USER"],
    }),
      allDrivers: builder.query({
      query: () => ({
        url: `/admin/drivers`,
        method: "GET",
      }),
      // invalidatesTags: ["USER"],
    }),
      allRides: builder.query({
      query: () => ({
        url: `/admin/rides`,
        method: "GET",
      }),
      // invalidatesTags: ["USER"],
    }),



//sos section
  updateSOSContacts: builder.mutation({
      query: ({ enableSOS, emergencyContacts }) => ({
        url: "/user/updateSOSContacts",
        method: "PATCH",
        body: { enableSOS, emergencyContacts },
      }),
    }),
    triggerSOS: builder.mutation({
      query: ({ location }) => ({
        url: "/user/triggerSOS",
        method: "PATCH",
        body: { location },
      }),
    }),
    getSOSInfo: builder.query({
      query: () => `/user/getSOSInfo`,
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
useCancelRideMutation,
useGetRiderOngoingRidesQuery,


useAllRidersQuery,
useBlockUserMutation,
useUnBlockUserMutation,
useAllDriversQuery,
useApproveDriverMutation,
useSuspendDriverMutation,
useAllRidesQuery,
useDriverOnlineStatusMutation,
useUpdateRideStatusMutation,
useGetRequestedRideQuery,



useGetSOSInfoQuery,
useTriggerSOSMutation,
useUpdateSOSContactsMutation
} = authApi;