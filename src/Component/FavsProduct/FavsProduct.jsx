import React, { use, useContext, useEffect, useState } from 'react'
import { Favs } from '../AuthContext/FavsContextProvider.jsx'
import { Link } from 'react-router-dom'
import noData from '../../assets/imgs/nodata.png'
import { toast } from 'react-toastify'
import { CartContext } from '../AuthContext/CartContextProvider.jsx'



export default function FavsProduct() {
  let [products, setProducts] = useState([])
  let [loading, setLoading] = useState(false)
  let { getFavs, deleteFav, setNumFav } = useContext(Favs)
  let { addUserCart, setNumcart } = useContext(CartContext)
  function addToCart(id) {
    addUserCart(id).then((req) => {
      setNumcart(req.data.numOfCartItems);
      toast.success(`${req.data.message}`)
    })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }

  function favsData() {
    setLoading(true)
    getFavs().then((req) => {
      setProducts(req.data.data)
      setNumFav(req.data.count)

    }).catch((err) => {
    toast.error(err.response.data.message)
    })
      .finally(() => {
        setLoading(false)
      })
  }
  function deleteProductFav(id) {
    deleteFav(id).then((req) => {
      favsData()

      toast.success(`${req.data.message}` || "success deleted")
      setNumFav(req.dacount);
      
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  }
  useEffect(() => {
    
    favsData()
  }, [])


  return (
    <>

      {loading ? (
        <div className="flex justify-center items-center h-screen bg-slate-100">
          <div class="loader"></div>
        </div>
      ) : <>{products.length === 0 ? (
        <div className="w-4/12 mx-auto">
          <img src={noData} className='w-full' alt="" />
        </div>
      ) : <div className="favs w-10/12 mx-auto py-12">
        <div className="flex flex-wrap">
          {products?.map((product) => {
            let { title, imageCover, category, ratingsAverage, _id, price } = product;
            return (
              <div key={_id} className="product hover:border hover:border-active  lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 mb-3">
                <div className="itemProduct p-3 group overflow-hidden relative">
                  <Link to={`/detalisProduct/${_id}`}>
                    <div className="relative">
                      <img src={imageCover} alt={title} className='w-full rounded-xl' />

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteProductFav(_id);
                        }}
                        className="absolute top-2 right-2 text-red-500 transition"
                      >
                        <i className="fa-solid fa-heart text-xl"></i>
                      </button>
                    </div>

                    <p className="category text-active my-1">
                      {category?.name || "Unknown Category"}
                    </p>
                    <h3 className='font-bold my-1'>{title}</h3>
                    <div className="flex justify-between">
                      <p className='salary text-start my-1'>{price} EGP</p>
                      <span>
                        <i className='fa-solid fa-star text-active'></i> <span>{ratingsAverage}</span>
                      </span>
                    </div>
                  </Link>

                  <button
                    onClick={() => { addToCart(_id); }}
                    className='translate-y-20 group-hover:translate-y-0 o-h text-white bg-active p-2 my-2 w-full rounded-3xl hover:bg-green-600 duration-500'
                  >
                    Add to Cart +
                  </button>
                </div>
              </div>
            );
          })}

        </div>
      </div>}</>}



    </>
  )
}
