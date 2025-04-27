import React from 'react'
import img from '../../assets/imgs/error.svg'
export default function Notfound() {
  return (
    <div className='flex justify-center items-center w-6/12 mx-auto mt-8'>
      <img src={img} className='w-full' alt="" />
    </div>
  )
}
