import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthUserContext } from './../AuthContext/AuthContextProvider';
import { CartContext } from '../AuthContext/CartContextProvider.jsx';
import logo from '../../assets/imgs/freshcart-logo.svg'
import imguser from '../../assets/imgs/def_person.webp'
import { Favs } from '../AuthContext/FavsContextProvider.jsx';

export default function Navbar() {
  let { numFav } = useContext(Favs)
  let { numCart } = useContext(CartContext)
  let navigate = useNavigate()
  let { token, setToken, logData } = useContext(AuthUserContext)

  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  function logOut() {
    localStorage.removeItem("token")
    setToken(null)
    navigate("/login")
  }

  let userName = (logData)

  return (
    <>
      <header className="bg-gray-50 shadow capitalize">
        <nav className="flex items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
          <div className="flex">
            <Link to={"/"} className="-m-1.5 p-1.5">
              <img className="w-auto" src={logo} alt="" />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button onClick={() => setIsOpen(true)} type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-1.5 text-gray-700 bg-slate-300">
              <span className="sr-only">Open main menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

          {token && (
            <div className="hidden lg:flex lg:gap-x-4 mx-20">
              <NavLink to="home" className="text-lg font-semibold p-2 rounded hover:bg-green-300 text-gray-500 hover:text-green-600">Home</NavLink>
              <NavLink to="products" className="text-lg font-semibold p-2 rounded hover:bg-green-300 text-gray-500 hover:text-green-600">Products</NavLink>
              <NavLink to="categories" className="text-lg font-semibold p-2 rounded hover:bg-green-300 text-gray-500 hover:text-green-600">Categories</NavLink>
              <NavLink to="brands" className="text-lg font-semibold rounded p-2 hover:bg-green-300 text-gray-500 hover:text-green-600">Brands</NavLink>
            </div>
          )}

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {token ? (
              <ul className='flex justify-center items-center'>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                    type="button"
                  >
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                     
                        <li>
                          <Link to={"/changepassword"} className="flex items-center px-4 py-2 hover:bg-gray-100">
                            <i className="fa-solid fa-unlock text-green-700 mr-2"></i> ChangePassword
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={() => { logOut(); setDropdownOpen(false); }}
                            className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                          >
                            <i className="fa-solid fa-right-from-bracket text-red-600 mr-2"></i> Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <li className='relative mx-2'>
                  <Link to={"/cart"}>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <p className='absolute bg-red-600 text-white font-sans rounded-full top-0 end-0 -translate-y-4'>{numCart}</p>
                  </Link>
                </li>

                <span className="mx-3 relative">
                  <Link to="/favsProduct">
                    <i className="fa-solid fa-heart"></i>
                    <p className='absolute bg-red-600 text-white font-sans rounded-full top-0 end-0 -translate-y-4 '>{numFav}</p>
                  </Link>
                </span>

                <img src={imguser} className='img_nav mx-2' alt="img_user" />

                <span className="flex flex-col justify-center items-center">
                  <span>{userName?.name}</span>
                  <span className="admin">{userName?.role}</span>
                </span>
              </ul>
            ) : (
              <>
                <NavLink to="login" className="text-sm mx-3 py-3 font-bold text-gray-600 hover:text-green-600">Login</NavLink>
                <NavLink to="signup" className="text-sm mx-3 py-3 font-bold text-gray-600 hover:text-green-600">Register</NavLink>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white px-6 py-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <img src={logo} alt="Logo" className="h-8 w-auto" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded bg-green-600 text-white"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>

            {token ? (
              <div className="space-y-4">
                <NavLink onClick={() => setIsOpen(false)} to="home" className="block px-3 py-2 rounded-lg text-lg text-gray-700 hover:bg-green-100">Home</NavLink>
                <NavLink onClick={() => setIsOpen(false)} to="products" className="block px-3 py-2 rounded-lg text-lg text-gray-700 hover:bg-green-100">Products</NavLink>
                <NavLink onClick={() => setIsOpen(false)} to="categories" className="block px-3 py-2 rounded-lg text-lg text-gray-700 hover:bg-green-100">Categories</NavLink>
                <NavLink onClick={() => setIsOpen(false)} to="brands" className="block px-3 py-2 rounded-lg text-lg text-gray-700 hover:bg-green-100">Brands</NavLink>

                <NavLink onClick={() => setIsOpen(false)} to="/cart" className="block px-3 py-2 rounded-lg text-lg text-gray-700 hover:bg-green-100">
                  <i className="fa-solid fa-cart-shopping mr-2"></i> Cart
                  {numCart > 0 && (
                    <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{numCart}</span>
                  )}
                </NavLink>

                <NavLink onClick={() => setIsOpen(false)} to="/favsProduct" className="block px-3 py-2 rounded-lg text-lg text-gray-700 hover:bg-green-100">
                  <i className="fa-solid fa-heart mr-2"></i> Favorites
                </NavLink>

                <button
                  onClick={() => { logOut(); setIsOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-lg text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <NavLink onClick={() => setIsOpen(false)} to="login" className="block px-3 py-2 rounded-lg text-lg text-gray-700 hover:bg-green-100">Login</NavLink>
                <NavLink onClick={() => setIsOpen(false)} to="signup" className="block px-3 py-2 rounded-lg text-lg text-gray-700 hover:bg-green-100">Register</NavLink>
              </div>
            )}
          </div>
        )}

      </header>
    </>
  )
}
