import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApiSlice = createApi({
	reducerPath: "productsApiSlice",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://dummyjson.com",
	}),
	endpoints: (builder) => ({
		getAllProducts: builder.query({
			query: () => "products",
		}),
		getProducts: builder.query({
			query: (product) => `products/search?1=${product}`,
		}),
	}),
});

export const { useGetAllProductsQuery, useGetProductsQuery } = productsApiSlice;
