import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthUserContext } from '../AuthContext/AuthContextProvider';

export let CartContext = createContext()

export default function CartContextProvider({ children }) {
  let [numCart, setNumcart] = useState(null)
  let { token } = useContext(AuthUserContext);
  let baseUrl = `https://ecommerce.routemisr.com/api/v1/cart`

  let headerOption = {
    headers: {
      token: token
    }
  }

  useEffect(() => {
    if (token) {
      getUserCart().then((req) => {
        setNumcart(req.data.numOfCartItems);
      }).catch(() => setNumcart(0));
    }
  }, [token])

  function getUserCart() {
    return axios.get(baseUrl, headerOption)
  }

  function addUserCart(id) {
    let data = { productId: id }
    return axios.post(baseUrl, data, headerOption)
  }

  function deleteUserCart(id) {
    return axios.delete(`${baseUrl}/${id}`, headerOption)
  }

  function clearUserCart() {
    return axios.delete(baseUrl, headerOption)
  }

  function countCart(id, count) {
    let data = { count }
    return axios.put(`${baseUrl}/${id}`, data, headerOption)
  }

  return (
    <CartContext.Provider value={{
      getUserCart, numCart, setNumcart,
      addUserCart, deleteUserCart, clearUserCart, countCart
    }}>
      {children}
    </CartContext.Provider>
  )
}
