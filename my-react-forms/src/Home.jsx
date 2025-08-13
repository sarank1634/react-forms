import React from 'react'
import { useContext  } from 'react';
import useLogout from './UseLogout';
import {Link} from 'react-router-dom'


const Home = () => {
  const naviagte = useNavigate();
  const logout = useLogout();

  const signOut = async() => {
    await logout();
    naviagte('/linkpage');
  }

  
  return (
    <section >
    <div>
       <h1> Home </h1> 
        <p>You are Logged in!</p>
        <br />
        <Link to="/editor"> Go to the Editor Page</Link>
        <br /> 
        <Link to="/admin"> Go to the Admin Page</Link>
        <br />
        <Link to="/lounge"> Go to the Lounge Page</Link>
        <br />
        <Link to="/linkpage"> Go to the link Page</Link>
        <br />
        <div className="flexGrow">
          <button onClick={logout}>Sign Out</button>
        </div>
              </div>
    </section>
  )
}

export default Home;