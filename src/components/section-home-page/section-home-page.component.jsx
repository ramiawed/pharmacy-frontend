import React from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import AdvertisementCompanyCard from "../advertisement-company-card/advertisement-company-card.component";

// components
import AdvertisementItemCard from "../advertisement-item-card/advertisement-item-card.component";

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
  dispatchAction,
  type,
}) {
  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: data.length > 3,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
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
      }}
    >
      <div
        className={styles.header}
        style={{ order: headerFlex, background: headerBackground }}
      >
        <h2>{t(header)}</h2>
        <p>{t(description)}</p>
      </div>
      <div className={styles.slicker} style={{ order: sliderFlex }}>
        <Slider {...settings}>
          {data?.map((d) => (
            <div key={d._id}>
              {type === "item" ? (
                <AdvertisementItemCard
                  dispatchAction={dispatchAction}
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
