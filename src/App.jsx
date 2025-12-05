import React from 'react'
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import Layout from './Component/Layout/Layout';
import Home from './Component/Home/Home';
import Products from './Component/Products/Products';
import Cart from './Component/Cart/Cart';
import Login from './Component/Login/Login';
import SignUp from './Component/Signup/SignUp';
import Notfound from './Component/Notfound/Notfound';
import Categories from './Component/Categories/Categories.jsx';
import Brands from './Component/Brands/Brands.jsx';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword.jsx';
import UpdatePassword from './Component/UpdatePassword/UpdatePassword.jsx';
import AuthContextProvider, { AuthUserContext } from './Component/AuthContext/AuthContextProvider';
import ProtectedRouting from './Component/ProtectedRouting/ProtectedRouting.jsx';
import DetalisProduct from './Component/DetalisProduct/DetalisProduct.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductBC from './Component/ProductBC/ProductBC.jsx';
import ProductBrand from './Component/ProductBC/ProductBrand.jsx';
import CartContextProvider from './Component/AuthContext/CartContextProvider.jsx';
import { ToastContainer } from 'react-toastify';
import ShippingDetails from './Component/ShippingDetails/ShippingDetails.jsx';
import AllorderUser from './Component/AllorderUser/AllorderUser.jsx';
import ChangePassword from './Component/ChangePassword/ChangePassword.jsx';
import FavsContextProvider from './Component/AuthContext/FavsContextProvider.jsx';
import FavsProduct from './Component/FavsProduct/FavsProduct.jsx';
import Rooms from './Component/Brands/Rooms.jsx';



export default function App() {

  let routs = createBrowserRouter([{
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRouting><Home /></ProtectedRouting> },
      { path: "home", element: <ProtectedRouting><Home /></ProtectedRouting> },
      { path: "products", element: <ProtectedRouting><Products /></ProtectedRouting> },
      { path: "cart", element: <ProtectedRouting><Cart /></ProtectedRouting> },
      { path: "brands", element: <ProtectedRouting><Brands /></ProtectedRouting> },
      { path: "cart", element: <ProtectedRouting><Cart /></ProtectedRouting> },
      { path: "login", element: <Login /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "updatepass", element: <UpdatePassword /> },
      { path: "signup", element: <SignUp /> },
      { path: "categories", element: <ProtectedRouting><Categories /></ProtectedRouting> },
      { path: "ProductBC/:id", element: <ProtectedRouting><ProductBC /></ProtectedRouting> },
      { path: "Productbrand/:id", element: <ProtectedRouting><ProductBrand /></ProtectedRouting> },
      { path: "detalisProduct/:id", element: <ProtectedRouting><DetalisProduct /></ProtectedRouting> },
      { path: "shippingdetails/:id", element: <ProtectedRouting><ShippingDetails /></ProtectedRouting> },
      { path: "/allorders", element: <ProtectedRouting><AllorderUser /> </ProtectedRouting> },
      { path: "/changePassword", element: <ProtectedRouting><ChangePassword /></ProtectedRouting> },
      { path: "/favsProduct", element: <ProtectedRouting><FavsProduct /></ProtectedRouting> },
 
   

    ]
  }])

  let client = new QueryClient()

  return (
    <>

      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <FavsContextProvider>
            <CartContextProvider>

              <RouterProvider router={routs} ></RouterProvider>
              <ToastContainer autoClose={2000} />
            </CartContextProvider>
          </FavsContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>

    </>
  )
}
