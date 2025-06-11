// src/store/features/patients/notificationApi.ts

import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 🔔 Fetch all notifications for a user
    getNotifications: builder.query<any[], string>({
      query: (userId) => ({
        url: `notification/${userId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // ✅ Mark all notifications as read
    markAllAsRead: builder.mutation({
      query: (userId) => ({
        url: `notification/markAllRead/${userId}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),

    // ✅ Optional: Mark a single notification as read
    markSingleAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `notification/${notificationId}/read`,
        method: "PATCH",
        credentials: "include" as const,
      }),
    }),

    // ✅ Optional: Delete a notification
    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `notifications/${notificationId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkSingleAsReadMutation,
  useDeleteNotificationMutation,
} = notificationApi;
