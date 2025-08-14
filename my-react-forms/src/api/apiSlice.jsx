import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";
import { setCredentials, logout } from "../features/authSlice";

const baseQurey = fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if(token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQureyWithReauth = async (AbortSignal, applyMiddleware, extraOptions) =>{
    let results = await baseQurey(AbortSignal, applyMiddleware, extraOptions)
    
    if(results?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // sen d new access token to get new access token
        const refreshResults = await baseQurey('/refresh', api, extraOptions)
        console.log(refreshResults)
       if(refreshResults?.data) {
        const user = api.getState().auth.user
        // store the new token 
        api.dispatch(setCredentials({ ...refreshResults.data, user }))
        //retrive the original qurey with new access token
        api.dispatch(setCredentials({ ...refreshResults.data, user  }))
        //retry the original qurey with new access token
        results = await  baseQurey(AbortSignal, api, extraOptions)
       } else {
        api.dispatch(logout())
       }
    }
    return results
}

export const apiSlice = createApi({
    baseQurey: baseQureyWithReauth,
    endpoints : builder =>{()}  
})