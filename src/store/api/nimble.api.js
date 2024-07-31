import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const nimbleApi = createApi({
  reducerPath: "nimble/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Authorization", "Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn");
      return headers;
    },
  }),
  endpoints: (build) => ({
    getContacts: build.query({
      query: () => ({
        url: "api/v1/contacts",
        method: "GET",
        params: {
          sort: "created:desc",
        },
      }),
      providesTags: ["Contact"],
      transformResponse: (response) =>
        response.resources.filter((item) => item.record_type === "person"),
    }),
    getContact: build.query({
      query: (contactId) => ({
        url: `/api/v1/contact/${contactId}`,
        method: "GET",
      }),
      providesTags: ["Contact"],
    }),
    createContact: build.mutation({
      query: (data) => ({
        url: "api/v1/contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteContact: build.mutation({
      query: (contactId) => ({
        url: `api/v1/contact/${contactId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
    addTags: build.mutation({
      query: ({contactId, addedTags}) => ({
        url: `/api/v1/contacts/${contactId}/tags`,
        method: "PUT",
        body: addedTags
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useAddTagsMutation,
} = nimbleApi;
