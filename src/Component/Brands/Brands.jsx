import React, { useState } from 'react'
import useApi from '../Hooks/useApi.jsx'
import { Link } from 'react-router-dom'

export default function Brands() {
  const [page, setPage] = useState(1)
  const limit = 18
  const { data, isLoading, isFetching } = useApi("brands", { page, limit })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-100">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap py-8">

        {data?.data?.data.map((e) => (
          <div key={e._id} className='text-center p-3 rounded-sm lg:w-2/12 md:w-3/12 sm:w-6/12 w-full'>
            <Link to={`/Productbrand/${e._id}`}>
              <img src={e.image} className='w-full rounded' alt={e.name} />
              <p className='text-active font-bold mt-1'>{e.name}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 mb-8">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={data?.data?.data.length < limit}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
        {isFetching && <div className="flex justify-center items-center h-screen bg-slate-100">
          <div className="loader"></div>
        </div>}
      </div>
    </>
  );
}
