import React from "react";
import Slider from "react-slick";
import { FaUsers, FaBed, FaBath } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";


import imgRoom1 from "../../assets/imgs/room1.jpg";
import imgRoom2 from "../../assets/imgs/room16.jpg";
import imgRoom3 from "../../assets/imgs/room5.jpg";
import imgRoom4 from "../../assets/imgs/room14.jpeg";
import imgRoom5 from "../../assets/imgs/room18.jpeg";
import imgRoom6 from "../../assets/imgs/room4.jpeg";

export default function Rooms() {


  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3, // الافتراضي
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // أقل من 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // أقل من 640px (موبايل)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  const rooms = [
    { img: imgRoom1, title: ("rooms.types.deluxe"), price: 800, guests: 2, beds: 2, baths: 1 },
    { img: imgRoom2, title: ("rooms.types.superior"), price: 750, guests: 2, beds: 2, baths: 1 },
    { img: imgRoom3, title: ("rooms.types.suite"), price: 1200, guests: 4, beds: 2, baths: 2 },
    { img: imgRoom4, title: ("rooms.types.family"), price: 900, guests: 4, beds: 3, baths: 2 },
    { img: imgRoom5, title: ("rooms.types.luxury"), price: 1500, guests: 3, beds: 2, baths: 2 },
    { img: imgRoom6, title: ("rooms.types.standard"), price: 600, guests: 2, beds: 1, baths: 1 },
  ];

  return (
    <section className="text-center py-8 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-zinc-600 md:w-4/12 mx-auto w-full">
        ("rooms.title")
      </h2>

      <div className="rooms-slider-container -mx-2 sm:-mx-3 md:-mx-4">
        <Slider {...settings}>
          {rooms.map((room, i) => (
            <div key={i} className="px-2 sm:px-3 md:px-4">
              <div className="rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 relative hover:shadow-2xl transition-shadow duration-300">
                <div className="overflow-hidden">
                  <img
                    className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-110"
                    src={room.img}
                    alt={room.title}
                  />

                </div>

                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  ${room.price}/("rooms.night")
                </span>

                <div className="p-4">
                  <h2 className="text-lg md:text-xl font-bold mb-2">{room.title}</h2>

                  <p className="text-gray-700 text-sm mb-3 flex flex-wrap justify-center gap-3">
                    <span className="flex items-center gap-1">
                      <FaUsers className="text-green-600" /> {room.guests} ("rooms.guests")
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBed className="text-green-600" /> {room.beds} ("rooms.beds")
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath className="text-green-600" /> {room.baths} ("rooms.baths")
                    </span>
                  </p>

                  <p className="text-gray-600 text-sm mb-2">("rooms.desc")</p>

                  <a
                    href="#"
                    className="flex bg-green-500 hover:bg-green-600 items-center justify-center text-white py-2 px-4 rounded-full transition-colors duration-500 hover:text-green-700 text-sm font-semibold"
                  >
                    ("rooms.readMore") <FiArrowUpRight className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}