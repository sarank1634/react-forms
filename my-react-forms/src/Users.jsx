import React from 'react'
import { useState, useEffect } from 'react'
import axios from'../src/api/axios'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
// import UseRefreshToken from './hooks/UseRefreshToken'

const Users = () => {
    const [users, setUsers] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    // const [refresh, useRefresh] = useState();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axios.get('/users', {
                    signal: controller.signal  
                });

                const userNames = response.data.map((user) => user.username);
                console.log(userNames);
                isMounted && setUsers(userNames);
            } catch (error) {
                console.error(error);
                navigate('/login',{state : {from: location   }, replace: true});
            }
        }
           getUsers(); 

           return() => {
            isMounted = false;
            controller.abort();
           }
    }, [])

  return (
    <article>
        <h2>Users List</h2>
        {users?.length
        ?(
            <ul>
                {users.map((user, i ) => <li key={i}>
                    {user}
                </li> )}
            </ul>
        ) : <p>No users to display</p>
        }
        {/* <button onClick={() => refresh()}>Refresh</button> */}
    </article>
   )
}

export default Users