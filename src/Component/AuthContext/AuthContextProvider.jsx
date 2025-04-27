import React, { useEffect } from 'react'
import { useState } from 'react';
import { createContext } from 'react'
export let AuthUserContext = createContext();
export default function AuthContextProvider({ children }) {
  let [token, setToken] = useState(null)

useEffect(()=>{
 let TokenStorge=localStorage.getItem("token")
  if(TokenStorge){
    setToken(TokenStorge)
  }
},[])

  return (
    <AuthUserContext.Provider value={{ token, setToken }}>
      {children}
    </AuthUserContext.Provider>
  )
}
