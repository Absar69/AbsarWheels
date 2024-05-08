import {apiSlice} from './apiSlice';
import {ORDERS_URL} from '../constants';


export const ordersApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}
            }),
        }),

    

    getOderDetails: builder.query({
        query: (orderId) => ({
            url: `${ORDERS_URL}/${orderId}`
            
        }),
        keepUnusedDataFor: 5

    }),

    getMyOrders: builder.query({
        query: () => ({
            url: `${ORDERS_URL}/mine`,

        }),
        keepUnusedDataFor: 5
    }),

    }),
});


export const {useCreateOrderMutation, useGetOderDetailsQuery, useGetMyOrdersQuery} = ordersApiSlice;