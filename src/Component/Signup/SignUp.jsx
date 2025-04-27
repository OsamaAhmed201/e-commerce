import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function SignUp() {
  let navigate=useNavigate()
  const [errors, setErrors] = useState(null)
  const [btnLoding,setbtnLoding]=useState(false)
  let BaseUrl = `https://ecommerce.routemisr.com`


  let validateYup = Yup.object({
    name: Yup.string().required("name Required").min(3, "min 2 char").max(20, "max 20 char"),
    email: Yup.string().required("email required").email("enter valid email"),
    password: Yup.string().required("password required").matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "password is invalid "),
    rePassword: Yup.string().required("rePassword required").oneOf([Yup.ref('password'), null], 'repassword not match'),
    phone: Yup.string().required(" phone required").matches(/^01[0125][0-9]{8}$/, "enter valid number"),

  })


  let registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: regestApi,
    validationSchema: validateYup,
  });


  async function regestApi(data) {
    setbtnLoding(true)
    await axios.post(`${BaseUrl}/api/v1/auth/signup`, data).catch((err) => {
      console.log(err.response.data.message);
      setErrors(err.response.data.message)
      setbtnLoding(false)
    })
    .then((req)=>{
      console.log(req.data.message);
      if(req.data.message == "success"){
        setbtnLoding(false)
        navigate('/login')
      }
      
    })
    


  }



  return (
    <>
      <h2 className='text-center  font-extrabold text-green-800 text-lg mt-5'>Resgister Now</h2>

      { errors?  <div class="flex w-6/12 mx-auto items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
        <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">{errors}</span> 
        </div>
      </div>:""}

      
      <form onSubmit={registerForm.handleSubmit} className="w-6/12 mx-auto ">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white "> Name</label>
          <input
            value={registerForm.values.name}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
            type="text"
            id="name"
            name='name'
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  " />
          {registerForm.touched.name && registerForm.errors.name ? <p className='text-red-700'>{registerForm.errors.name}</p> : " "}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white ">Your email</label>
          <input
            value={registerForm.values.email}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="email"
            id="email"
            name='email'
            className=" email_input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  " />
          {registerForm.touched.email && registerForm.errors.email ? <p className='text-red-700'>{registerForm.errors.email}</p> : " "}
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white "> Password</label>
          <input
            value={registerForm.values.password}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="password"
            id="password"
            name='password'
            className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  " />
          {registerForm.touched.password && registerForm.errors.password ? <p className='text-red-700'>{registerForm.errors.password}</p> : " "}
        </div>

        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white "> rePassword</label>
          <input
            value={registerForm.values.rePassword}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="password"
            id="rePassword"
            name='rePassword'
            className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  " />
          {registerForm.touched.rePassword && registerForm.errors.rePassword ? <p className='text-red-700'>{registerForm.errors.rePassword}</p> : " "}
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white "> Phone</label>
          <input
            value={registerForm.values.phone}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            type="tel"
            id="phone"
            name='phone'
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  " />
          {registerForm.touched.phone && registerForm.errors.phone ? <p className='text-red-700'>{registerForm.errors.phone}</p> : " "}
        </div>

        <button disabled={!(registerForm.isValid && registerForm.dirty)}
          type="submit" className="text-white bg-active hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-active disabled:bg-opacity-35"> {btnLoding?<i className='fa fa-spinner fa-spin'></i>:'Register'}</button>
      </form>



    </>
  )
}
