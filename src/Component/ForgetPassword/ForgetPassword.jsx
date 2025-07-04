
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgetPassword() {
    const [error, setError] = useState(null)
    const [dispalyForm, setdispalyForm] = useState(true)
    let [btnLoding, setbtnLoding] = useState(false)
    let navigate = useNavigate()

    let BaseUrl = `https://ecommerce.routemisr.com`

    let validatYup = Yup.object({
        email: Yup.string().required("email is required").email("enter valid email"),

    })

    let validat2Yup = Yup.object({
        resetCode: Yup.string().required("resetCode is required")
    })

    let ForgetForm = useFormik({
        initialValues: {
            email: "",

        },
        onSubmit: ForgetApi,
        validationSchema: validatYup,

    })

    let resetCodeForm = useFormik({
        initialValues: {
            resetCode: "",
        },
        onSubmit: resetCodeApi,
        validationSchema: validat2Yup,

    })
    async function ForgetApi(data) {
        setbtnLoding(true)
        try {
            let res = await axios.post(`${BaseUrl}/api/v1/auth/forgotPasswords`, data)
            toast.success(res.data.message||"please check your email")
            setbtnLoding(false)
            setdispalyForm(false)
        }
        catch (err) {
            setError(err.response.data.message);
            setbtnLoding(false)
        }

    }

    async function resetCodeApi(data) {
        setbtnLoding(true)
        try {
            let response = await axios.post(`${BaseUrl}/api/v1/auth/verifyResetCode`, data)

            toast.success(response.data.status||"CODE IS CORRECT")
            setbtnLoding(false)
            navigate('/updatepass')

        }
        catch (err) {
            setError(err.response.data.message);
            setbtnLoding(false)
        }





    }



    return (
        <>
            <div className="fogetPass py-28 ">


                {dispalyForm ?
                    <div>
                        <h2 className='text-center  font-extrabold text-green-800 text-lg mb-7'>enter your email</h2>


                        <form onSubmit={ForgetForm.handleSubmit} className="w-8/12 md:w-4/12 mx-auto">
                            {error ? <div class="flex w-8/12 md:w-4/12 mx-auto items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                                <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span class="sr-only">Info</span>
                                <div>
                                    <span class="font-medium">{error}</span>
                                </div>
                            </div> : ""}
                            <div className="mb-5">

                                <input
                                    value={ForgetForm.values.email}
                                    onChange={ForgetForm.handleChange}
                                    onBlur={ForgetForm.handleBlur}
                                    placeholder='email'
                                    type="email"
                                    id="email"
                                    name='email'
                                    className=" email_input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  " />
                                {ForgetForm.touched.email && ForgetForm.errors.email ? <p className='text-red-700'>{ForgetForm.errors.email}</p> : ""}

                            </div>


                            <div className="   w-full mx-auto">
                                <button disabled={!(ForgetForm.isValid && ForgetForm.dirty)}
                                    type="submit" className="text-white w-full px-5 py-2.5 bg-active hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-active disabled:bg-opacity-40">{btnLoding ? <i className='fa fa-spinner fa-spin'></i> : "Send"}</button>
                            </div>
                        </form>
                    </div> :
                    <div>
                        <h2 className='text-center  font-extrabold text-green-800 text-lg '>Enter Verify ResetCode </h2>
                        {error ? <div class="flex w-8/12 md:w-4/12 mx-auto items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                            <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span class="sr-only">Info</span>
                            <div>
                                <span class="font-medium">{error}</span>
                            </div>
                        </div> : ""}

                        <form onSubmit={resetCodeForm.handleSubmit} className="w-8/12 md:w-4/12 mx-auto">

                            <div className="mb-5 mt-5">

                                <input
                                    value={resetCodeForm.values.resetCode}
                                    onChange={resetCodeForm.handleChange}
                                    onBlur={resetCodeForm.handleBlur}
                                    placeholder='resetCode'
                                    type="string"
                                    id="resetCode"
                                    name='resetCode'
                                    className="   bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  " />
                                {resetCodeForm.touched.resetCode && resetCodeForm.errors.resetCode ? <p className='text-red-700'>{resetCodeForm.errors.resetCode}</p> : ""}

                            </div>

                            <div className=" w-full ">

                                <button disabled={!(resetCodeForm.isValid && resetCodeForm.dirty)}
                                    type="submit" className="text-white w-full px-5 py-2.5 bg-active hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-active disabled:bg-opacity-40">{btnLoding ? <i className='fa fa-spinner fa-spin'></i> : "Send"}</button>
                            </div>
                        </form>
                    </div>}



            </div>

        </>
    )
}
