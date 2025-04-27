import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import useApi from '../Hooks/useApi.jsx'
import { CartContext } from '../AuthContext/CartContextProvider.jsx'
import { ToastContainer, toast } from 'react-toastify'

export default function Products() {
let {addUserCart,setNumcart}= useContext(CartContext)
  let [numPages, setNumPages] = useState(1)
  let limit = 18;
  let { data, isFetched, isLoading } = useApi("products", { page: numPages, limit })
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-slate-100">
      <div class="loader"></div>
    </div>
  }
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
                      <button onClick={()=>{addToCart(_id)}} className=' translate-y-20 group-hover:translate-y-0 o-h  text-white bg-active p-2 my-2  w-full rounded-3xl hover:bg-green-600 duration-500'>Add to Cart +</button>
                    </div>
                
                
                </div>

              )
            })}
          </div>

          {/* pagination */}


        </div >}

      <div className="flex justify-center mt-10">
        <button
          onClick={()=>setNumPages((old)=>Math.max(old-1,1))}
          disabled={numPages === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >Previous</button>
        <span className='text-active font-semibold m-3'>Page {numPages}</span>
        <button
          onClick={()=>setNumPages((old)=>old+1)}
          disabled={data?.data?.data?.length < limit}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >Next</button>
      </div>
    </>
  )
}
