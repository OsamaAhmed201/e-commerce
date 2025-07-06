import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { createContext } from 'react'
export let AuthUserContext = createContext();
export default function AuthContextProvider({ children }) {
  let [token, setToken] = useState(null)
  let [logData, setLogData] = useState(null)

useEffect(() => {
  let TokenStorge = localStorage.getItem("token");
  if (TokenStorge) {
    setToken(TokenStorge);
    setLogData(jwtDecode(TokenStorge));
  }
}, []);

  
  const updateAuth = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setLogData(jwtDecode(newToken));
  };

  return (
    <AuthUserContext.Provider value={{ token, setToken, logData, setLogData, updateAuth }}>
      {children}
    </AuthUserContext.Provider>
  )
}
