import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../AuthContext/CartContextProvider.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Favs } from '../AuthContext/FavsContextProvider.jsx'
import { AuthUserContext } from '../AuthContext/AuthContextProvider.jsx'

export default function Products() {
  let { addFav, deleteFav, getFavs, setNumFav } = useContext(Favs)
  let { addUserCart, setNumcart } = useContext(CartContext)
  let { token } = useContext(AuthUserContext);

  let [loadingPage, setLoadingPage] = useState(false)
  let [products, setProducts] = useState([])
  let [numPages, setNumPages] = useState(1)
  const [nameValue, setNameValue] = useState('')
  const [favProductsIds, setFavProductsIds] = useState(new Set())

  let limit = 18

 useEffect(() => {
  if (!token) return;
  getFavs()
    .then(res => {
      setNumFav(res.data.count);
      const ids = res.data.data.map(item => item._id);
      setFavProductsIds(new Set(ids));
    })
    .catch(err => {
      console.error(err);
    });
}, [token, getFavs]);


  function toggleFavorite(id) {
    if (favProductsIds.has(id)) {
      deleteFav(id)
        .then((res) => {
          toast.success(res.data.message || "Removed from favorites");
          setNumFav(res.count);
          setFavProductsIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Error");
        });
    } else {
      addFav(id)
        .then((res) => {
          toast.success(res.data.message || "Added to favorites");
          setFavProductsIds((prev) => new Set(prev).add(id));
          setNumFav(res.count);
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "Error");
        });
    }
  }

  function addToCart(id) {
    addUserCart(id).then((req) => {
      setNumcart(req.data.numOfCartItems);
      toast.success(`${req.data.message}`)
    })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Error")
      })
  }

  async function getProducts() {
    setLoadingPage(true)
    try {
      let response = await axios(`https://ecommerce.routemisr.com/api/v1/products?page=${numPages}&limit=${limit}`);
      setProducts(response.data.data);
      setLoadingPage(false)
    }
    catch (err) {
      setLoadingPage(false)
      toast.error(err.response?.data?.message || "Error")
    }

  }



  useEffect(() => {
    getProducts(nameValue)
  }, [nameValue, numPages])

  return (
    <>
      <div className="container mx-auto py-20">


        {loadingPage ? (
          <div className="flex justify-center items-center h-screen bg-slate-100">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="bg-slate-100 py-5">
            <div className="flex flex-wrap mx-auto">
              {products?.map((product) => {
                let { title, imageCover, category, ratingsAverage, _id, price } = product;
                const isFav = favProductsIds.has(_id);

                return (
                  <div
                    key={_id}
                    className="product hover:border hover:border-active lg:w-2/12 md:w-3/12 sm:w-6/12 w-full px-3 mb-3"
                  >
                    <div className="itemProduct p-3 group overflow-hidden relative">
                      <Link to={`/detalisProduct/${_id}`}>
                        <div className="relative">
                          <img src={imageCover} alt={title} className='w-full rounded-xl' />

                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleFavorite(_id);
                            }}
                            className={`absolute top-2 right-2 transition ${isFav ? "text-red-500" : "text-gray-400 hover:text-red-500"
                              }`}
                          >
                            <i className="fa-solid fa-heart text-xl"></i>
                          </button>
                        </div>

                        <p className="category text-active my-1">
                          {category?.name || "Unknown Category"}
                        </p>
                        <h3 className='font-bold my-1'>
                          {title.split(" ").slice(0, 2).join(" ")}
                        </h3>
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
          </div>
        )}

        {/* pagination */}
        <div className="flex justify-center mt-10 pb-14">
          <button
            onClick={() => setNumPages((old) => Math.max(old - 1, 1))}
            disabled={numPages === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className='text-active font-semibold m-3'>Page {numPages}</span>
          <button
            onClick={() => setNumPages((old) => old + 1)}
            disabled={products?.length < limit}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}
