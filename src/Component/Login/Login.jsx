import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthUserContext } from '../AuthContext/AuthContextProvider.jsx';
import { toast } from 'react-toastify';

export default function Login() {
  let { setToken, updateAuth } = useContext(AuthUserContext)
  const [error, setError] = useState(null)
  const [btnLoding, setbtnLoding] = useState(false)

  let navigate = useNavigate()

  let BaseUrl = `https://ecommerce.routemisr.com`

  let validatYup = Yup.object({
    email: Yup.string().required("email is required").email("enter valid email"),
    password: Yup.string().required("password is required").matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "password is invalid ")
  })

  let loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginApi,
    validationSchema: validatYup,

  })

  async function loginApi(data) {
    setbtnLoding(true)
    await axios.post(`${BaseUrl}/api/v1/auth/signin`, data).then((req) => {
      if (req.data.message == "success") {
        updateAuth(req.data.token); 
        setbtnLoding(false);
        toast.success("success login");
        navigate('/');
      }

    }).catch((err) => {
      setError(err.response.data.message);
      setbtnLoding(false)

    })

  }



  return (
    <>
      <div className="allLogin py-10 w-full">
        <h2 className='text-center  font-extrabold text-green-800 text-lg mt-5 mb-6'>Login Now</h2>
        {error ? <div class="flex w-8/12 md:w-5/12 mx-auto items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
          <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">{error}</span>
          </div>
        </div> : ""}

        <div className="flex flex-wrap justify-center align-center ">

          <form onSubmit={loginForm.handleSubmit} className="w-8/12 md:w-5/12 mx-auto">

            <div className="mb-5">
              <label htmlFor="email" className="block mb-1 text-sm font-bold text-gray-900 dark:text-white ">Your email</label>
              <input
              placeholder='osamaahmeddev71@gmail.com'
                value={loginForm.values.email}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                type="email"
                id="email"
                name='email'
                className=" email_input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  " />
              {loginForm.touched.email && loginForm.errors.email ? <p className='text-red-700'>{loginForm.errors.email}</p> : ""}

            </div>

            <div className="mb-2">
              <label htmlFor="password" className="block mb-1 text-sm  font-bold text-gray-900 dark:text-white "> Password</label>
              <input
              placeholder='!Abc111'
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values.password}
                type="password"
                id="password"
                name='password'
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  " />
              {loginForm.touched.password && loginForm.errors.password ? <p className='text-red-700'>{loginForm.errors.password}</p> : ""}

            </div>
            <Link to={'/forgetpassword'} className='text-blue-600 font-bold '>ForgetPassword...?</Link>
            <br />
            <br />
            <div className="flex items-center justify-center w-full">
              <button
                disabled={!(loginForm.isValid && loginForm.dirty)}
                type="submit"
                className="text-white w-full px-5 py-2.5 bg-active hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-active disabled:bg-opacity-40"
              >
                {btnLoding ? <i className="fa fa-spinner fa-spin"></i> : 'Login'}
              </button>
            </div>

          </form>

        </div>

      </div>
    </>
  )
}
