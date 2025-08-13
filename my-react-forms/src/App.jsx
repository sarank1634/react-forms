import './App.css'
import { Login } from './Login';
import {Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import Register from './Register'
import RequiredAuth from './RequiredAuth';
import Editor from './Editor';
import Admin from './Admin';
import Lounge from './Lounge';

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
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />

        <Route element={<RequiredAuth allowedRoles={[ROLES.Editor]} />}>
         <Route path='editor' element={<Editor />} />
         </Route>

        <Route element={<RequiredAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path='admin' element={<Admin />} />
        </Route>
      
        <Route path='lounge' element={<Lounge />} />
        </Route>
      
    </Routes>

         </>
  )
}

export default App;
