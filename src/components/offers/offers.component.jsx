import React from "react";

import Slider from "react-slick";

import { useSelector } from "react-redux";

import styles from "./offers.module.scss";

import { Colors } from "../../utils/constants";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { selectFavoritesCompanies } from "../../redux/advertisements/favoritesCompaniesSlice";
import CompanyFavoriteCard from "../company-favorite-card/company-favorite-card.component";

function Offers({ title }) {
  const { t } = useTranslation();
  const { favoritesCompanies } = useSelector(selectFavoritesCompanies);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: true,
  };

  return (
    <div className={styles.container}>
      <h2>{t(title)}</h2>
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
