import React from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './../Footer/Footer';
import WhatsappChat from '../wts/WhatsappChat';

export default function Layout() {
  const location = useLocation();
  const hideFooterRoutes = ['/login', '/signup', '/forgetpassword', '/updatepass'];


  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
  return (
    <>
      <Navbar />
      <div >
        <Outlet />
      </div>
      <WhatsappChat />
      {!shouldHideFooter && <Footer />}

    </>
  )
}
