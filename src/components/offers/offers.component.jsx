import React from "react";

import Slider from "react-slick";

import styles from "./offers.module.scss";

import { Colors } from "../../utils/constants";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";

function Offers({ title }) {
  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className={styles.container}>
      <h2>{t(title)}</h2>
      <Slider {...settings}>
        <div>
          <h1
            style={{
              background: Colors.SECONDARY_COLOR,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              margin: "10px",
            }}
          >
            1
          </h1>
        </div>
        <div>
          <h1
            style={{
              background: Colors.SECONDARY_COLOR,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              margin: "10px",
            }}
          >
            2
          </h1>
        </div>
        <div>
          <h1
            style={{
              background: Colors.SECONDARY_COLOR,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              margin: "10px",
            }}
          >
            3
          </h1>
        </div>
        <div>
          <h1
            style={{
              background: Colors.SECONDARY_COLOR,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              margin: "10px",
            }}
          >
            4
          </h1>
        </div>
      </Slider>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        left: "-50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: Colors.SECONDARY_COLOR,
      }}
    >
      <IoIosArrowBack size={32} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        width: "50px",
        height: "50px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: Colors.SECONDARY_COLOR,
      }}
    >
      <IoIosArrowForward size={32} />
    </div>
  );
}

export default Offers;
