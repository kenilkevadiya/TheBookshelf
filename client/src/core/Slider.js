import React from "react";
import Slider from "react-slick";
import logo from "../assets/1.jpeg";
import logo1 from "../assets/2.jpeg";
import logo2 from "../assets/3.jpeg";
import logo3 from "../assets/4.jpeg";
import logo4 from "../assets/9.jpg";

export default function SliderImg() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-white-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-white-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto relative ">
      <Slider {...settings}>
        <div>
          <img className="h-[430px]" src={logo} alt="" />
        </div>
        <div>
          <img className="h-[430px]" src={logo1} alt="" />
        </div>
        <div>
          <img className="h-[430px]" src={logo2} alt="" />
        </div>
        <div>
          <img className="h-[430px]" src={logo3} alt="" />
        </div>
        <div>
          <img className="h-[430px]" src={logo4} alt="" />
        </div>
      </Slider>
    </div>
  );
}
