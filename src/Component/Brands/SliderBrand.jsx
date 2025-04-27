import React from 'react'
import useApi from '../Hooks/useApi.jsx';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default function SliderBrand() {
  let { data, isLoading } = useApi("brands")
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-slate-100  ">
      <div class="loader"></div>
    </div>
  }
  var settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };
  return (
    <>
      <Slider {...settings} className='cursor-pointer'>
        {data?.data?.data.map((e) => {
          return (
            <div key={e._id} className='text-center p-3 rounded-sm'>
              <Link to={`/Productbrand/${e._id}`}>
                <img src={e.image} className='w-full  rounded ' alt="" />
                <p className='text-active mt-2 font-bold'>{e.name}</p>
              </Link>
            </div>
          )
        })}
      </Slider>
    </>
  )
}