import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
export default function ShippingDetails() {
    let { id } = useParams()
    let headerOption = {
        headers: {
            token: localStorage.getItem("token")
        }
    }

    let validatYup = Yup.object({
        details: Yup.string().required("enter details "),
        phone: Yup.string().required(" phone required").matches(/^01[0125][0-9]{8}$/, "enter valid number"),
        city: Yup.string().required("enter Your city")
    })

    let CheckFormik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        onSubmit: SippingApi,
        validationSchema: validatYup,
    })

    function SippingApi(value) {
        let data = {
            shippingAddress: value
        };

        axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://e-commerce-931i.vercel.app/allorders`,
            data,
            headerOption
        )
            .then((req) => {
                window.location.href = req.data.session.url;
            })
            .catch((err) => {
                console.error(err);
            });
    }


    return (
        <>
            <form className='w-6/12 mx-auto py-10' onSubmit={CheckFormik.handleSubmit} >
                <div className="mb-5">
                    <label htmlFor="details" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white "> details</label>
                    <input
                        value={CheckFormik.values.details}
                        onBlur={CheckFormik.handleBlur}
                        onChange={CheckFormik.handleChange}
                        type="text"
                        id="details"
                        name='details'
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  " />
                    {CheckFormik.touched.details && CheckFormik.errors.details ? <p className='text-red-700'>{CheckFormik.errors.details}</p> : " "}
                </div>
                <div className="mb-5">
                    <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white "> City</label>
                    <input
                        value={CheckFormik.values.city}
                        onBlur={CheckFormik.handleBlur}
                        onChange={CheckFormik.handleChange}
                        type="text"
                        id="city"
                        name='city'
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  " />
                    {CheckFormik.touched.city && CheckFormik.errors.city ? <p className='text-red-700'>{CheckFormik.errors.city}</p> : " "}
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white "> Phone</label>
                    <input
                        value={CheckFormik.values.phone}
                        onChange={CheckFormik.handleChange}
                        onBlur={CheckFormik.handleBlur}
                        type="tel"
                        id="phone"
                        name='phone'
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  " />
                    {CheckFormik.touched.phone && CheckFormik.errors.phone ? <p className='text-red-700'>{CheckFormik.errors.phone}</p> : " "}
                </div>
                <button className='text-white bg-active p-2 rounded w-full'>Pay </button>
            </form>
        </>
    )
}
