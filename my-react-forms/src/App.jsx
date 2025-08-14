import './App.css'
import { Login } from './Login';
import {Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import Register from './Register'
import RequiredAuth from './RequiredAuth';
import Editor from './Editor';
import Admin from './Admin';
import Lounge from './Lounge';
import PresistLogin from '../src/PresistLogin'
import Unauthorized from '../src/Unauthorized'
import Public from './Public'
import Login from './Login'
import Register from './Register'
import Welcome from './Welcome'
import Editor from './Editor'
import Admin from './Admin'
import Lounge from './Lounge'

import Home from './Home';
const ROLES = {
  'User' : 20201,
  'Editor' : 1984,
  'Admin' : 5051
}
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout />} >
      {/* public routes */}
      <Route index element={<Public />} /> 
      <Route path='/login' element={<Login />} /> 

      {/* protected routes */}
      <Route element={<RequiredAuth /> } >
        <Route path='welcome' element={<Welcome />} />
      </Route>


      <Route path='/unauthorized' element={<Unauthorized />} />
      </Route>
      </Routes>


    <Routes>
      <Route path='/' element={<Layout />} >
      {/* public routes */}
      
        <Route path='/login' element={<Login />} /> 
        <Route path='/register' element={<Register />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PresistLogin />}  >
          <Route element={<RequiredAuth allowedRoles={[ROLES.User]} />}>
          <Route path='/' element={<Home />} />
          </Route> 

        <Route element={<RequiredAuth allowedRoles={[ROLES.Editor]} />}>
         <Route path='editor' element={<Editor />} />
         </Route>

        <Route element={<RequiredAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path='admin' element={<Admin />} />
        </Route>
      
        <Route element={<RequiredAuth allowedRoles={[ROLES.Editor  ,ROLES.Admin]} />}>
        <Route path='lounge' element={<Lounge />} />
        </Route>
        </Route>

        </Route>
      
    </Routes>

         </>
  )
}

export default App;
