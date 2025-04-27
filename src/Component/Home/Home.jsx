import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import MainSlider from '../MainSlider/MainSlider.jsx'
import Products from '../Products/Products.jsx'
import axios from 'axios';
import useApi from './../Hooks/useApi';
import SliderCategory from '../Categories/SliderCategory.jsx';
import SliderBrand from '../Brands/SliderBrand.jsx';

export default function Home() {
  
  return (

    <div>
      <MainSlider />
      <h2 className='text-active text-xl font-bold'>Categories</h2>
      <SliderCategory />

      <Products />

      <h2 className='text-active text-xl font-bold'>Brands</h2>
      <SliderBrand />
    </div>
  )
}
