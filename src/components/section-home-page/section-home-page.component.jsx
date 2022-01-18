import React, { useEffect, useState } from "react";
import Slider from "react-slick";

// components
import AdvertisementItemCard from "../advertisement-item-card/advertisement-item-card.component";
import AdvertisementCompanyCard from "../advertisement-company-card/advertisement-company-card.component";

// styles
import styles from "./section-home-page.module.scss";

function SectionHomePage({
  data,
  containerBackground,
  headerFlex,
  headerBackground,
  sliderFlex,
  header,
  description,
  type,
  order,
}) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    console.log(order, header);
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
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    rtl: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className={styles.container}
      style={{
        background: containerBackground,
        order: order,
      }}
    >
      <div
        className={styles.header}
        style={{
          order: width <= "769" ? 1 : headerFlex,
          background: headerBackground,
        }}
      >
        <h2>{header}</h2>
        <p>{description}</p>
      </div>
      <div
        className={styles.slicker}
        style={{ order: width <= "769" ? 2 : sliderFlex }}
      >
        <Slider {...settings}>
          {data?.map((d) => (
            <div key={d._id}>
              {type === "item" ? (
                <AdvertisementItemCard
                  companyItem={d}
                  contentColor={headerBackground}
                />
              ) : (
                <AdvertisementCompanyCard
                  user={d}
                  contentColor={headerBackground}
                />
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SectionHomePage;
