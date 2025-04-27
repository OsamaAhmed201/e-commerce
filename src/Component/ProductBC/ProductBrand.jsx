import React, { useContext } from 'react'
import { data, Link, useParams } from 'react-router-dom'
import useApi from '../Hooks/useApi.jsx';
import noData from '../../assets/imgs/nodata.png'
import { CartContext } from '../AuthContext/CartContextProvider.jsx';
import { ToastContainer, toast } from 'react-toastify'
export default function ProductBrand() {
  let { addUserCart, setNumcart } = useContext(CartContext)
  let { id } = useParams();
  console.log(id);

  let { data, isLoading } = useApi("products", { brand: id })
  console.log(data?.data?.data);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-100  ">
        <div class="loader"></div>
      </div>
    )
  }
  if (data?.data?.data.length === 0) {
    return (
      <div className="w-4/12 mx-auto">
        <img src={noData} className='w-full' alt="" />
      </div>
    )
  }
  function addToCart(id) {
    addUserCart(id).then((req) => {
      setNumcart(req.data.numOfCartItems);
      toast.success(`${req.data.message}`)
      console.log(req.data.message);

    })
      .catch((err) => {

        toast.error(err.response.data.message)
      })
  }


  return (
    <>
      {
        <div className=" bg-slate-100 py-5">
          <div className=" flex flex-wrap  mx-auto  ">
            {data?.data.data.map((product) => {
              let { title, imageCover, category, ratingsAverage, _id, price } = product
              return (

                <div key={_id} className="product hover:border hover:border-active  lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 mb-3">

                  <div className="itemProduct p-3 group overflow-hidden   ">
                    <Link to={`/detalisProduct/${_id}`}>
                      <img src={imageCover} alt={title} className='w-full rounded-xl' />

                      <p className="category text-active my-1">
                        {category.name}
                      </p>
                      <h3 className='font-bold my-1'>{title.split(" ").slice(0, 2).join(" ")}</h3>
                      <div className="flex justify-between">
                        <p className='salary text-start my-1'>{price} EGP</p>
                        <span>
                          <i className='fa-solid fa-star text-active'></i> <span>{ratingsAverage}</span>
                        </span>
                      </div>
                    </Link>
                    <button onClick={() => { addToCart(_id) }} className=' translate-y-20 group-hover:translate-y-0 o-h  text-white bg-active p-2 my-2  w-full rounded-3xl hover:bg-green-600 duration-500'>Add to Cart +</button>
                  </div>


                </div>

              )
            })}
          </div>




        </div >}
    </>
  )
}