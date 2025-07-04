import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick';
import { CartContext } from '../AuthContext/CartContextProvider.jsx';
import { ToastContainer, toast } from 'react-toastify'

export default function DetalisProduct() {
    let {addUserCart,setNumcart}= useContext(CartContext)
    let [product, setProduct] = useState(null)
    let [loding, setLoding] = useState(true)

    let { id } = useParams()
    function getDetalis(id) {
        setLoding(true)
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((req) => {
            setProduct(req.data.data);

        }).finally(() => {
            setLoding(false)
        })
    }
    useEffect(() => {
        getDetalis(id)
    }, [id])
    const settings = {
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 1000,
    };
      function addToCart(id){
        addUserCart(id).then((req)=>{
          setNumcart(req.data.numOfCartItems);
          toast.success(`${req.data.message}`)
          console.log(req.data.message);
          
        })
        .catch((err)=>{
    
          toast.error(err.response.data.message)
        })
      }
    return (
        <>
            {loding ? <div className="flex justify-center items-center h-screen bg-slate-100  ">
                <div class="loader"></div>
            </div> : 
            <div className="flex flex-wrap py-14 container mx-auto ">

                <div className="lg:w-3/12 md:w-3/12 w-full  p-5 ">
                    <div className="w-full">
                        <Slider {...settings} >
                            {product?.images.map((img, i) => {
                                return (
                                    <div className="" key={i}>
                                        <img src={img} className='w-full rounded-2xl' alt="" />
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
                <div className="lg:w-9/12 md:w-9/12  p-10 ">
                    <h2 className='font-bold text-2xl mb-3'>{product?.title}</h2>
                    <p className='text-gray-600 mb-3'>{product?.description}</p>
                    <p className=' font-bold mb-2'>category : <span className='text-active'>{product?.category.name}</span></p>
                    <p className=' font-bold mb-2'>brand : <span className='text-active'>{product?.brand.name}</span></p>
                    <p className='font-bold '>quantity: <span className='text-active'>{product?.quantity}</span> </p>
                    <div className="flex justify-between translate-y-10 ">
                        <p className='salary text-start my-1 font-semibold'>{product?.price} EGP</p>
                        <span>
                            <i className='fa-solid fa-star text-active'></i> <span>{product?.ratingsAverage}</span>
                        </span>
                    </div>
                    <button onClick={()=>{addToCart(id)}} className=' translate-y-10 group-hover:translate-y-0 o-h  text-white bg-active p-2 my-2  w-full rounded-3xl hover:bg-green-600 '>Add to Cart +</button>
                </div>

            </div>}


        </>
    )
}
