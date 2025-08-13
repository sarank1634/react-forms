import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import UseRefreshToken from "./UseRefreshToken";
import useAuth from "./useAuth";




const UseAxiosPrivate = () => {
    const refresh = UseRefreshToken();
    const {auth} = useAuth();
   
  
  useEffect(() => {

    const requestIntercept = axiosPrivate.interceptors.request.use(
        config => {
            if (!config.headers[`Authorization`]) {
                config.headers[`Authorization`] = `Bearer ${auth?.accessToken}`;
            }
            return config;
        }, (error) => Promise.reject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
        response =>  response,
        async (error) => {
            const prevRequest = error?.config;
            if(error?.response?.status === 403 && !prevRequest?.sent ) {
                 prevRequest.sent = true;
                 const newAccessToken = await refresh();
                 prevRequest.header['Authorization'] `Bearer ${newAccessToken}`;
                 return axiosPrivate(prevRequest)
            } 
            return Promise.reject(error);
        }
    )
    return () => {
        axiosPrivate.interceptors.ejet(requestIntercept);
        axiosPrivate.interceptors.ejet(responseIntercept);

    }
  },[auth, refresh])

  return UseAxiosPrivate;
}

export default UseAxiosPrivate