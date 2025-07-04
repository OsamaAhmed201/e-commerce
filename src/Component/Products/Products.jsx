import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { CartContext } from '../AuthContext/CartContextProvider.jsx'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

export default function Products() {
  let { addUserCart, setNumcart } = useContext(CartContext)
  let [lodingPage, setLodingPage] = useState(false)
  let [products, setProducts] = useState([])
  let [numPages, setNumPages] = useState(1)
  const [nameValue, setNameValue] = useState('');

  let limit = 18;

  async function getProducts(searchText = '') {
    setLodingPage(true)
    try {
      let response = await axios(`https://ecommerce.routemisr.com/api/v1/products?page=${numPages}&limit=${limit}`);
      setProducts(response.data.data);
      setLodingPage(false)
    }
    catch (err) {
      setLodingPage(false)
      toast.error(err.response.data.message)
    }
  }

  function addToCart(id) {
    addUserCart(id).then((req) => {
      setNumcart(req.data.numOfCartItems);
      toast.success(`${req.data.message}`)
    })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }
  async function handleSearchInput(data) {
    console.log(data);

    setNameValue(data);
    setNumPages(1);


  }
  useEffect(() => {
    getProducts(nameValue)
  }, [nameValue, numPages])


  return (
    <>
      <div className="container mx-auto">
        <div className='text-center'>
          <input className='w-1/2 mx-auto p-2 my-4 input_search' type="text" placeholder='Search by name' value={nameValue} onChange={(e) => handleSearchInput(e.target.value)} />
        </div>
        {lodingPage ? <div className="flex justify-center items-center h-screen bg-slate-100">
          <div class="loader"></div>
        </div> :
          <div className=" bg-slate-100 py-5">
            <div className=" flex flex-wrap  mx-auto  ">
              {products?.map((product) => {
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
        {/* pagination */}
        <div className="flex justify-center mt-10 pb-14">
          <button
            onClick={() => setNumPages((old) => Math.max(old - 1, 1))}
            disabled={numPages === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >Previous</button>
          <span className='text-active font-semibold m-3'>Page {numPages}</span>
          <button
            onClick={() => setNumPages((old) => old + 1)}
            disabled={products?.length < limit}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >Next</button>
        </div>

      </div>
    </>
  )
}
