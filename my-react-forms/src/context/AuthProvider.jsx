import React, { createContext, useState, useContext } from 'react'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  // const  [presist, setPresist] = useState(JSON.parse(localStorage.getItem("presist")) || alse);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)