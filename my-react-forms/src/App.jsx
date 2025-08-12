import './App.css'
import { Login } from './Login';
import {Routes, Route} from 'react-router-dom'
import {Layout} from '../src/Layout'
import Register from './Register'
import RequiredAuth from './RequiredAuth';

const ROLES = {
  'User' : 20201,
  'Editor' : 1984,
  'Admin' : 5051
}
function App() {
  return (
    <>
    <Routes>
      <Route element={<RequiredAuth allowedRoles={[]}/>} >

      </Route> 

      <Route path='/' element={<Layout />} >
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />

        <Route element={<RequiredAuth allowedRoles={[]} />}>
         <Route path='editor' element={<Editor />} />
         </Route>

         
        <Route element={<RequiredAuth allowedRoles={[ROLES.Editor]} />}>
        <Route path='editor' element={<Admin />} />
         </Route>
      
         <Route path='editor' element={<LOunge />} />
        </Route>
      
    </Routes>

         </>
  )
}

export default App;
