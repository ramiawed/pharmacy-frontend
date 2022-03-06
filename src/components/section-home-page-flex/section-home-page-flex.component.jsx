import React from "react";
import Slider from "react-slick";

// components
import AdvertisementItem from "../advertisement-item/advertisement-item.component";
import AdvertisementPartner from "../advertisement-partner/advertisement-partner.component";

// styles
import styles from "./section-home-page-flex.module.scss";

function SectionHomePageFlex({
  data,
  containerBackground,
  headerBackground,
  header,
  description,
  type,
  order,
}) {
  const settings = {
    infinite: true,
    vertical: true,
    speed: 300,
    slidesToShow: 1,
    // slidesToScroll: data.length >= 5 ? 2 : 0,
    // initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    rtl: true,
  };

  return (
    <div
      className={styles.container}
      style={{
        order: order,
        background: headerBackground,
      }}
    >
      <div
        className={styles.header}
        style={{
          background: headerBackground,
        }}
      >
        <h2>{header}</h2>
        <p>{description}</p>
      </div>

      <div className={styles.advertisement_container}>
        <Slider {...settings}>
          {data?.map((d) => (
            <div className={styles.inner_container} key={d._id}>
              {type === "item" ? (
                <AdvertisementItem
                  item={d}
                  contentColor={containerBackground}
                />
              ) : (
                <AdvertisementPartner
                  user={d}
                  contentColor={containerBackground}
                />
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SectionHomePageFlex;
