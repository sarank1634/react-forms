import {useRef, useState, useEffect, useRef} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import {useDispatch} from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';


const Login =( ) => {
    const useRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMSg, setErrMsg] = useState('');
    const navvigate = useNavigate();

    const [login, { isLoading}] = useLoginMutation()
    const dispatch = useDispatch();
    
    useEffect(() => {
        useRef.current = user.focus('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({user, pwd}).unwrap()
            dispatch(setCredentials({ ...userData, user }))
                setUser('')
                setPwd('')
                Navigate('/welcome')  
        } catch (error) {
            if (!error?.response){
                setErrMsg('No Server Response')
            } else if ( error.response?.status === 400) {
                setErrMsg('Missing username or password')
            } else if(error.response?.status === 401){
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();

        }
    }

    const handleUserInput = (e) => setUser(e.target.value)

    const handlePwdInput = (e) => setPwd(e.target.value)

    const content = isLoading ? <h1>Loading...</h1> :(

     <section className="login">
           <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}
              aria-live="assertive">{errMsg}</p>
            <h1>Employee Login</h1>

            <form onSubmit={handleSubmit} >
                <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={user}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                  />

                <label htmlFor="password">Password</label>
                  <input
                    type='password'
                    id="password"
                    value={pwd}
                    onChange={handlePwdInput}
                    required
                  />
                  <button  >Sign In</button>
          </form>    
        </section>

    )
    return content
}

export default Login;