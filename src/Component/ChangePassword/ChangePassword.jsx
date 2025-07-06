import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import * as Yup from 'yup'
import { AuthUserContext } from '../AuthContext/AuthContextProvider.jsx';
export default function ChangePassword() {
    let token = localStorage.getItem("token");



    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    let navigate = useNavigate()
    const [btnLoding, setbtnLoding] = useState(false)
    let BaseUrl = `https://ecommerce.routemisr.com`

    let validateYup = Yup.object({
        currentPassword: Yup.string().required("password required").matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "password is invalid "),
        password: Yup.string().required("password required").matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "password is invalid "),
        rePassword: Yup.string().required("rePassword required").oneOf([Yup.ref('password'), null], 'repassword not match'),
    })
    let NewPassForm = useFormik({
        initialValues: {
            currentPassword: "",
            password: "",
            rePassword: "",
        },
        onSubmit: changePass,
        validationSchema: validateYup,
    });

    async function changePass(data) {
        console.log(token);

        setbtnLoding(true);
        try {

            let response = await axios.put(`${BaseUrl}/api/v1/users/changeMyPassword`, data, {
                headers: {
                    token: token
                }
            });
            toast.success(response.data.message || "success change password");
            navigate('/');
        } catch (err) {
            
            toast.error(err?.response?.data?.message || "something went wrong");
        } finally {
            setbtnLoding(false);
        }
    }


    return (
        <>
            <div className="changePassword  py-16">
                <h2>ChangePassword</h2>


                <form onSubmit={NewPassForm.handleSubmit} className="w-6/12 mx-auto">



                    <div className="relative mb-6">
                        {/* INPUT */}
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="currentPassword"
                            placeholder="currentPassword"
                            value={NewPassForm.values.currentPassword}
                            onChange={NewPassForm.handleChange}
                            onBlur={NewPassForm.handleBlur}
                            className={`block w-full h-12 rounded-lg border ${NewPassForm.touched.currentPassword && NewPassForm.errors.currentPassword
                                ? 'border-red-500'
                                : 'border-gray-300'
                                } bg-gray-50 ps-4 pe-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
                        />

                        {/* EYE ICON */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showPassword ? (
                                <i className="fa-solid fa-eye-slash"></i>
                            ) : (
                                <i className="fa-solid fa-eye"></i>
                            )}
                        </button>


                        {/* ERROR MESSAGE */}
                        {NewPassForm.touched.currentPassword && NewPassForm.errors.currentPassword && (
                            <p className="mt-1 text-sm text-red-600">{NewPassForm.errors.currentPassword}</p>
                        )}
                    </div>



                    <div className="relative mb-6">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="New Password"
                            value={NewPassForm.values.password}
                            onChange={NewPassForm.handleChange}
                            onBlur={NewPassForm.handleBlur}
                            className={`block w-full h-12 rounded-lg border ${NewPassForm.touched.password && NewPassForm.errors.password
                                ? 'border-red-500'
                                : 'border-gray-300'
                                } bg-gray-50 ps-4 pe-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
                        />

                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showNewPassword ? (
                                <i className="fa-solid fa-eye-slash"></i>
                            ) : (
                                <i className="fa-solid fa-eye"></i>
                            )}
                        </button>



                        {NewPassForm.touched.password && NewPassForm.errors.password && (
                            <p className="mt-1 text-sm text-red-600">{NewPassForm.errors.password}</p>
                        )}
                    </div>


                    <div className="relative mb-6">

                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="rePassword"
                            placeholder="Confirm Password"
                            value={NewPassForm.values.rePassword}
                            onChange={NewPassForm.handleChange}
                            onBlur={NewPassForm.handleBlur}
                            className={`block w-full h-12 rounded-lg border ${NewPassForm.touched.rePassword && NewPassForm.errors.rePassword
                                ? 'border-red-500'
                                : 'border-gray-300'
                                } bg-gray-50 ps-4 pe-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
                        />


                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showConfirmPassword ? (
                                <i className="fa-solid fa-eye-slash"></i>
                            ) : (
                                <i className="fa-solid fa-eye"></i>
                            )}
                        </button>



                        {NewPassForm.touched.rePassword && NewPassForm.errors.rePassword && (
                            <p className="mt-1 text-sm text-red-600">{NewPassForm.errors.rePassword}</p>
                        )}
                    </div>

                    <button className='btn_change ' type='submit'>{btnLoding ? "loading..." : "Change Password"}    </button>
                </form>




            </div>
        </>
    )
}
