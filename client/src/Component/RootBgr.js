import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import books from "./bookphoto.jpeg";
import im1 from "./img1.jpg";
import im2 from "./img2.jpg";
import im3 from "./img3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper/core";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function RootBgr() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="bgr"
        style={{
          backgroundImage: `url(${books})`,
          height: "100%",
          width: "100%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "auto",
          lineHeight: "88vh",
          alignItems: "center",
        }}
      >
        <div>
          <Swiper
            className="banner"
            centeredSlides={true}
            autoHeight={true}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            //pagination = {{ clickable: true }}
            loop={true}
            autoplay={{ delay: 1800 }}
            style={{ height: "50%", width: "30%" }}
          >
            <SwiperSlide>
              <img src={im1} width="100%" height="100%" />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={im2}
                width="100%"
                height="100%"
                onClick={() => {
                  navigate("/upload");
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={im3}
                width="100%"
                height="100%"
                onClick={() => {
                  navigate("/memo");
                }}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default RootBgr;
