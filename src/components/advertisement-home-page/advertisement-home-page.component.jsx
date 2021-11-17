import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Colors } from "../../utils/constants";

import AdvertisementCard from "../advertisement-card/advertisement-card.component";

import styles from "./advertisement-home-page.module.scss";

function AdvertisementHomePage({ data }) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeWidthHandler = () => {
      setWidth(document.documentElement.clientWidth);
    };
    window.addEventListener("resize", changeWidthHandler);

    return () => {
      window.removeEventListener("resize", changeWidthHandler);
    };
  });

  const settings = {
    dots: true,
    infinite: data.length > 2,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    rtl: true,
  };

  return (
    <div className={styles.container}>
      <div className={styles.slicker}>
        <Slider {...settings}>
          {data?.map((d) => (
            <div key={d._id}>
              <div className={styles.img}>
                <img
                  src={`http://localhost:8000/${d.logo_url}`}
                  alt="Thumb"
                  style={{
                    width: "100%",
                    height: "350px",
                  }}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default AdvertisementHomePage;
