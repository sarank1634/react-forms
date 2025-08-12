import { useRef,useContext, useEffect, useState } from 'react'

import axios from './api/axios';
const LOGIN_URL = '/auth'

import { AuthContext } from './context/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import './login.css'


export const Login = () => {
    const {setAuth} = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef(null);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [user, pwd])

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
            const roles = response?.data?.roles;
            setAuth({user, pwd, roles, accessToken});
        setSuccess(true),
        setUser(''),
        setPwd('')
        } catch (error) {
            if(!error.response){
                setErrMsg('No Server Response')
            } else if ( error.response?.status === 400) {
                setErrMsg('Missing username or password')
            } else if(error.response?.status === 401){
                setErrMsg('Login Failed')
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }  finally {
          setIsLoading(false);
        }
    }

    return ( 
    <>     
       {success ? (
        <section className="form-container">
          <div className="form-card">
            <h1>Welcome back</h1>
            <p className="success">You are logged in!</p>
            <p style={{ marginTop: '1rem' }}>
                <a href="#">Go to Home</a>
            </p>
          </div>
        </section>
       ):(
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
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
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
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
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
            </form>
            <p className="hint">Need an account? <a href="link">Sign up</a></p>
          </div>
        </section>
       )}
    </>
    )
}
