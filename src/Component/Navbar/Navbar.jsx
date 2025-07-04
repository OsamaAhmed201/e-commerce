import React, { useContext, useState } from 'react'
import logo from '../../assets/imgs/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthUserContext } from './../AuthContext/AuthContextProvider';
import { CartContext } from '../AuthContext/CartContextProvider.jsx';
import imguser from '../../assets/imgs/def_person.webp'

export default function Navbar() {
  let { numCart } = useContext(CartContext)
  let navigate = useNavigate()
  let { token, setToken, logData } = useContext(AuthUserContext)
  
  const [isOpen, setIsOpen] = useState(false)
  function logOut() {
    localStorage.removeItem("token")
    setToken(null)
    navigate("/login")
  }
  let userName = (logData)
  
  return (
    <>
      <header className="fexed bg-gray-50 shadow inset-x-0 top-0 z-50 capitalize">
        <nav className="flex items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
          <div className="flex ms ">
            <Link to={"/"} className="-m-1.5 p-1.5">

              <img className=" w-auto" src={logo} alt />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button onClick={() => setIsOpen(true)} type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-1.5 text-gray-700 bg-slate-300">
              <span className="sr-only">Open main menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          {token ? <div className="hidden lg:flex lg:gap-x-4">
            <NavLink to="home" className="text-sm/6 font-semibold p-2 rounded hover:bg-green-300 text-gray-500 ms-10 hover:text-green-600">Home</NavLink>
            <NavLink to="products" className="text-sm/6 font-semibold p-2 rounded hover:bg-green-300 text-gray-500 hover:text-green-600">Products</NavLink>
            <NavLink to="categories" className="text-sm/6 font-semibold p-2 rounded hover:bg-green-300 text-gray-500 hover:text-green-600">Categories</NavLink>
            <NavLink to="brands" className="text-sm/6 font-semibold rounded p-2  hover:bg-green-300 text-gray-500 hover:text-green-600">Brands</NavLink>

          </div> : ""}

          <div className="hidden lg:flex lg:flex-1  lg:justify-end">
            {token ? <ul className='flex justify-center items-center'>

              <div>
                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="text-block    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
                  type="button"
                >
                  <svg
                    className="w-2.5 h-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                <div
                  id="dropdown"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <li><Link to={'/profile'}  className="dropdown-item" ><i class="fa-solid my-3 fa-user-tie ms-5 text-indigo-700"></i> Profile</Link></li>
                    </li>
                    <li>
                      <li><Link className="dropdown-item" ><i class="fa-solid fa-unlock ms-5 my-3 text-green-700"></i> ChangePassword</Link></li>
                    </li>
                    <li>
                      <li><Link onClick={() => { logOut() }} className="dropdown-item" ><i className="fa-solid fa-right-from-bracket text-red-600 my-3 ps-5"></i> Logout</Link></li>
                    </li>
                  </ul>
                </div>
              </div>



              <li className='relative'>
                <Link to={"/cart"}>
                  <i class="fa-solid fa-cart-shopping "></i>
                  <p className='absolute bg-red-600 text-white font-sans  rounded-full top-0 end-0 -translate-y-4'>{numCart}</p>
                </Link>
              </li>
              <span className=" mx-3 position-relative d-flex align-items-center">
                <div>
                  <i class="fa-solid fa-heart"></i>
                </div>
              </span>
              <img src={imguser} className='img_nav  mx-2' alt="img_user" />

              <span className="flex flex-col justify-center items-center ">
                <span>{userName?.name}</span>
                <span className="admin tex">{userName?.role}</span>
              </span>

            </ul> : <>
              <NavLink to="login" className="text-sm/6 mx-3 font-semibold text-gray-600 hover:text-green-600">Login </NavLink>
              <NavLink to="signup" className="text-sm/6 mx-3 font-semibold text-gray-600 hover:text-green-600">Register </NavLink>
            </>}


          </div>
        </nav>
        {/* Mobile menu, show/hide based on menu open state. */}
        <div className={isOpen ? "lg:hidden" : "hidden"} role="dialog" aria-modal="true">
          {/* Background backdrop, show/hide based on slide-over state. */}
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src={logo} alt />
              </a>
              <button onClick={() => setIsOpen(false)} type="button" className="-m-2.5 rounded-md p-1 text-gray-700 hover:gree bg-green-600 hover:bg-green-700 ">
                <span className="sr-only">Close menu</span>
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {token ? <div className="space-y-2 py-6">
                  <NavLink to="home" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-500 hover:bg-gray-50 hover:text-green-600">Home</NavLink>
                  <NavLink to="products" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-500 hover:bg-gray-50 hover:text-green-600">Products</NavLink>
                  <NavLink to="categories" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-500 hover:bg-gray-50 hover:text-green-600">Categories</NavLink>
                  <NavLink to="brands" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-500 hover:bg-gray-50 hover:text-green-600">Brands</NavLink>
                </div> : " "}

                <div className="py-6">
                  {token ? <ul >
                    <li className='relative inline-block hover:text-slate-600 duration-500'>
                      <Link to={"/cart"}>
                        <i class="fa-solid fa-cart-shopping "></i>
                        <p className='absolute bg-red-600 text-white font-sans  rounded-full top-0 end-0 -translate-y-4'>{numCart}</p>
                      </Link>
                    </li>

                    <span className=" mx-3 position-relative d-flex align-items-center">
                      <div>
                        <i className="fa-solid fa-bell"></i>
                        <div className="dot"></div>
                      </div>
                    </span>
                    <img src={imguser} className='img_nav  mx-2' alt="" />

                    <span className="flex flex-col justify-center ">
                      <span>{userName?.name}</span>
                      <span className="admin tex">{userName?.role}</span>
                    </span>


                  </ul> : <>
                    <NavLink to="signup" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-600 hover:bg-gray-50 hover:text-green-600">Register</NavLink>
                    <NavLink to="login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-600 hover:bg-gray-50 hover:text-green-600">Log in</NavLink>
                  </>}


                </div>
              </div>
            </div>
          </div>
        </div>
      </header>




    </>
  )
}
