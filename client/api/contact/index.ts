import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contacts, DeleteReponse, NewContact } from "./types";

export const rootApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints: (builder) => ({
    contacts: builder.query<Contacts[], void>({
      query: () => "contact",
      providesTags: (result) =>
        result
          ? [
              { type: "Contacts", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Contacts", id })),
            ]
          : [{ type: "Contacts", id: "LIST" }],
    }),
    newContact: builder.mutation<Contacts, NewContact>({
      query: (body: NewContact) => ({
        url: "/contact",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Contacts", id: "LIST" }],
    }),
    deleteContact: builder.mutation<DeleteReponse, string>({
      query(id) {
        return {
          url: `/contact/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Contacts", id }],
    }),
    updateContact: builder.mutation<Contacts, Contacts>({
      query: (body: Contacts) => ({
        url: `/contact/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Contacts", id }],
    }),
    getContact: builder.query<Contacts, string>({
      query: (id) => `/contact/${id}`,
      providesTags: (result, error, id) => [{ type: "Contacts", id }],
    }),
  }),
  tagTypes: ["Contacts"],
});

export const {
  useContactsQuery,
  useNewContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
  useLazyGetContactQuery,
} = rootApi;
