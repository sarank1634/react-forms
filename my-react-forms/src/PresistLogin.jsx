import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useReferenceToken from '../src/hooks/UseRefreshToken';
import useAuth from "./hooks/useAuth";
import { use } from "react";


const presistLogin = () => {

  const [isLoading, setLoading] = useState(true);
  const refresh = useReferenceToken();
  const { auth, presist } = useAuth();

  useEffect(() => {
     let isMounted = true;  

    const verifyRefreshToken = async () => {
      try {
        await refresh
      } catch (err) {
        console.error(err);
      }
      finally {
        isMounted && setLoading(false);
      }
    }
    !auth?.accessToken ? verifyRefreshToken() : setLoading(false);
    return () => isMounted = false;
  }, [])
  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
  }, [isLoading])

  return (
    <>
      {!presist
        ? <Outlet />
        : isLoading ?
          <p>Loading...</p>
          : <Outlet />
      }
    </>
  )
}

export default presistLogin;