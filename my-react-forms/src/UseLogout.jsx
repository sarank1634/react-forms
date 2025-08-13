import axios from "./api/axios";
import useAuth from "./hooks/useAuth";



const useLogout =() => {

    const {setAuth} = useAuth();

    const Logout = async() => {
        setAuth({});
        try {
            const response = await axios('/logout', {
                withCredentials: true
            })
        } catch (err) {
            console.error(err);   
        }
    }

}

export default useLogout;