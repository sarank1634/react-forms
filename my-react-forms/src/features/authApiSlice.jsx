import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: creedentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...creedentials }
            })
        })
    })
})

export const  {
    useLoginMutation,
    useLogoutMutation,
    useRefreshTokenMutation
} = authApiSlice;