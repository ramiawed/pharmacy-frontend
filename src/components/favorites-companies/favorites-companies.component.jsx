import React from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";

// components
import CompanyFavoriteCard from "../company-favorite-card/company-favorite-card.component";

// redux stuff
import { useSelector } from "react-redux";
import { selectFavoritesCompanies } from "../../redux/advertisements/favoritesCompaniesSlice";

// styles
import styles from "./favorites-companies.module.scss";

function FavoritesCompanies() {
  const { t } = useTranslation();
  const { favoritesCompanies } = useSelector(selectFavoritesCompanies);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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
    <div className={styles.container}>
      <h2>{t("most-visited-company")}</h2>
      <Slider {...settings}>
        {favoritesCompanies?.map((company) => (
          <div key={company._id}>
            <CompanyFavoriteCard user={company} fullWidth={true} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default FavoritesCompanies;
