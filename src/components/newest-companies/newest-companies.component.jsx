import React from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";

// components
import CompanyFavoriteCard from "../company-favorite-card/company-favorite-card.component";

// redux stuff
import { useSelector } from "react-redux";
import { selectNewestCompanies } from "../../redux/advertisements/newestCompaniesSlice";

// styles
import styles from "./newest-companies.module.scss";
import NewestCompanyCard from "../newest-company-card/newest-company-card.component";

function NewestCompanies() {
  const { t } = useTranslation();
  const { newestCompanies } = useSelector(selectNewestCompanies);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
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
      <h2>{t("newest-companies")}</h2>
      <Slider {...settings}>
        {newestCompanies?.map((company) => (
          <div key={company._id}>
            <NewestCompanyCard user={company} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default NewestCompanies;
