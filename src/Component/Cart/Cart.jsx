import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../AuthContext/CartContextProvider.jsx'
import noData from '../../assets/imgs/nodata.png'
import { Link, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

export default function Cart() {
  let { deleteUserCart, clearUserCart, setNumcart, countCart } = useContext(CartContext)
  const [CartProduct, setCartProduct] = useState(null);
  const [loding, setLoding] = useState(true);
  const [countloding, setcountLoding] = useState(false);


  const { getUserCart } = useContext(CartContext);

  function CartData() {
    setLoding(true)
    getUserCart()
      .then((req) => {
        setCartProduct(req.data?.data);
        console.log(req.data?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoding(false)
      });
  }
  function deleteItemCart(id) {
    deleteUserCart(id).then((req) => {
      console.log(req.data);
      setNumcart(req.data.numOfCartItems);
      setCartProduct(req.data.data)
      toast.success(`success deleted`)
    })
  }
  function clearCart() {
    clearUserCart().then((req) => {
      console.log(req);
      if (req.data.message == "success") {
        setNumcart(0)
        setCartProduct(null)
        toast.success(`All Cart deleted`)
      }
    })
  }
  function updateItmeCart(id, count) {
    document.getElementById(id).innerHTML = `<i class='fa fa-spinner fa-spin text-active'></i>`
    setcountLoding(true)
    countCart(id, count).then((req) => {

      setCartProduct(req.data.data)
      setcountLoding(false)
      document.getElementById(id).innerHTML = count
    })
  }

  useEffect(() => {
    CartData();
  }, []);

  if (loding) {
    return <div className="flex justify-center items-center h-screen bg-slate-100  ">
      <div class="loader"></div>
    </div>
  }

  return (
    <>
      <div className="container mx-auto">
        {CartProduct?.products.length > 0 ? (
          <div className="w-10/12 mx-auto bg-fuchsia-100 my-10">
            <div className="p-5 flex justify-between">
              <div className="">
                <h1 className='font-bold'>Shop Cart:</h1>
                <h3 className='text-active'>Total Cart Price: {CartProduct.totalCartPrice} EGP</h3>
              </div>
              <button onClick={() => {
                clearCart()
              }} className="clear p-2 bg-active text-white rounded-lg font-bold hover:bg-green-700 duration-500">Clear Cart</button >

            </div>

            <div className="all_itmeCart">
              {CartProduct.products.map((e) => (

                <div key={e.product.id} className="flex flex-wrap px-5 items-center ">

                  <div className="sm:w-10/12 mt-5 flex">

                    <div className="w-2/12">
                      <Link to={`/detalisProduct/${e.product.id}`}>

                        <img src={e.product.imageCover} className='w-full rounded pb-2' alt="product" />
                      </Link>
                    </div>

                    <div className="w-11/12 ms-5 ">
                      <p className='font-semibold'>{e.product.title}</p>
                      <p>price: {e.price}</p>
                      <button onClick={() => { deleteItemCart(e.product.id) }} className='text-active mt-1 hover:text-green-700'>
                        <i className="fa-solid fa-trash-can m-1"></i> Remove
                      </button>
                    </div>
                  </div>

                  <div className="w-full sm:w-2/12 flex justify-end mt-3 sm:mt-0">
                    <button onClick={() => {
                      updateItmeCart(e.product.id, e.count + 1)
                    }} className='border font-bold border-active rounded hover:bg-active hover:text-white px-2'>+</button>
                    <p id={e.product.id} className='mx-2 font-semibold'>{e.count}</p>
                    <button onClick={() => {
                      updateItmeCart(e.product.id, e.count - 1)
                    }} className='border font-bold border-active rounded hover:bg-active hover:text-white px-2'>-</button>
                  </div>

                  <hr className='mt-2 w-full' />

                </div>

              ))}

            </div>
            <Link to={`/shippingdetails/${CartProduct._id}`} className='bg-blue-700 flex justify-center items-center  p-2 text-white rounded inline-block w-full text-center font-bold'>pay <i class=" text-black font-bold mx-1 fa-brands fa-cc-visa"></i></Link>
          </div>) : <div className="w-4/12 mx-auto mt-10 ">
          <img src={noData} className='w-full' alt="no data" />
        </div>}
      </div>
    </>


  );
}
