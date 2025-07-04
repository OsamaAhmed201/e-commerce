
import Products from '../Products/Products.jsx'

import SliderCategory from '../Categories/SliderCategory.jsx';
import SliderBrand from '../Brands/SliderBrand.jsx';
import Footer from './../Footer/Footer';

export default function Home() {

  return (

    <div>
      <div className="main_sliderImg mb-16">

    
      </div>
      <div className="container mx-auto">
      <h2 className='text-active text-xl font-bold'>Categories</h2>
      <SliderCategory />

      <Products />

      <h2 className='text-active text-xl font-bold'>Brands</h2>
      <SliderBrand />
      </div>
    
    </div>
  )
}
