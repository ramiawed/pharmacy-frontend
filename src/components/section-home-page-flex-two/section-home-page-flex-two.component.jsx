import React from "react";
import Slider from "react-slick";

// components
import AdvertisementItem from "../advertisement-item/advertisement-item.component";
import AdvertisementPartner from "../advertisement-partner/advertisement-partner.component";

// styles
import styles from "./section-home-page-flex-two.module.scss";

function SectionHomePageFlexTwo({
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
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
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

export default SectionHomePageFlexTwo;
