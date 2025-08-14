import { useRef, useEffect, useState } from 'react'
import useAuth from './hooks/useAuth';
import {Link, useNavigate, useLocation} from 'react-router-dom'
import axios from './api/axios';
const LOGIN_URL = '/auth'
import useInput from './hooks/useInput';
import useToggle from './hooks/useToggle';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './login.css'

export const Login = () => {
    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef(null);

    const [user, resetUser, userAttribute] = useInput('user','')//useState('');
    const [pwd, resetPwd, pwdAttribute] = useInput('pwd','');
    const [errMsg, setErrMsg] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [check, toggleCheck ] = useToggle('presist', false)


    useEffect(() => {
        // Focus username only on initial mount to avoid focus jumping while typing password
        userRef.current?.focus();
    }, [])

    // Clear error message on input change
    useEffect(() => {
        if (errMsg) setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          setIsLoading(true);
          const response = await axios.post(LOGIN_URL,
            JSON.stringify({user, pwd}),
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
            }); 
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken;
            setAuth({user, accessToken});  
        //setUser(''),
        resetUser();
        resetPwd();
        navigate(from, {replace: true});
        } catch (error) {
            if(!error.response){
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
      
    // const togglePersist = () => {
    //   setPresist(prev => !prev);
    // }

    // useEffect( () => {
    //    localStorage.setItem("presist", presist)
    // }, [presist])

    return (
     <section className="form-container">
          <div className="form-card">
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}
              aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} className="form">
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <div className="input-with-icon">
                  <span className="icon" aria-hidden="true">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    {...userAttribute }
                    required
                    placeholder="Enter your username"
                    aria-invalid={!!errMsg}
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <span className="icon" aria-hidden="true">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    type={showPwd ? 'text' : 'password'}
                    id="password"
                    {...pwdAttribute}
                    required
                    placeholder="Enter your password"
                    aria-invalid={!!errMsg}
                  />
                  <button
                    type="button"
                    className="toggle-btn"
                    onClick={() => setShowPwd((s) => !s)}
                    aria-label={showPwd ? 'Hide password' : 'Show password'}
                  >
                    <FontAwesomeIcon icon={showPwd ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={!user || !pwd || isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? 'Signing in…' : 'Sign In'}
              </button>
              <div className="presist">
                <input type="checkbox"
                id='persist'
                onChange={toggleCheck} 
                checked={check}
                />
                <label htmlFor="persist">Trust this device</label>
              </div>
            </form>
            <p className="hint">Need an account? <a href="/register">Sign up</a></p>
          </div>
        </section>
  
    )
}
