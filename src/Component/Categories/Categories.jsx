import React from 'react'
import useApi from '../Hooks/useApi.jsx'
import { Link } from 'react-router-dom'

export default function Categories() {
  let { data, isLoading } = useApi("categories")
  if (isLoading) {

    return <div className="flex justify-center items-center h-screen bg-slate-100  ">
      <div class="loader"></div>
    </div>
  }
  return (

    <>
      <div className="flex flex-wrap py-8 container mx-auto">
        {data?.data?.data?.map((e) => {

          return (
            
              <div key={e._id} className='text-center p-3 rounded-sm  lg:w-2/12 md:w-3/12 sm:w-6/12 w-full'>
              <Link to={`/ProductBC/${e._id}`}>
                <img src={e.image} className='w-full h-60 rounded ' alt="" />
                <p className='text-active font-bold'>{e.name}</p>
                </Link>
              </div>
            
          )

        })}
      </div>
    </>
  )
}
