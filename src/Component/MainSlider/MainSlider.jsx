import React from "react";
import Slider from "react-slick";
import slid1 from '../../assets/imgs/1 (1).png'
import slid2 from '../../assets/imgs/1 (2).png'

export default function MainSlider() {
    var settings = {
       
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay: true,
    };
    return (
        <>
            <div className="flex py-10">
                <div className="w-full">
                <Slider {...settings}>
                    <div>
                        <img src={slid1} className="w-full img_slid  " alt="" />
                    </div>
                    <div>
                        <img src={slid2} className="w-full img_slid " />
                    </div>
                   


                </Slider>
                </div>
               
            </div>


        </>

    );
}