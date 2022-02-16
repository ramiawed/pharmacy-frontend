import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Slider from "react-slick";
import { selectUser } from "../../redux/auth/authSlice";
import {
  resetMedicines,
  setSearchCompanyName,
  setSearchWarehouseName,
} from "../../redux/medicines/medicinesSlices";
import { SERVER_URL } from "../../utils/constants";

import styles from "./advertisement-home-page.module.scss";

function AdvertisementHomePage({ data }) {
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(selectUser);

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
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 1,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    rtl: true,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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

  const advertisementClickHandler = (d) => {
    dispatch(resetMedicines());
    if (d.warehouse && d.warehouse.allowShowingMedicines) {
      dispatch(setSearchWarehouseName(d.warehouse.name));
      history.push({
        pathname: "/medicines",
      });
    }

    if (d.company) {
      dispatch(setSearchCompanyName(d.company.name));
      history.push({
        pathname: "/medicines",
      });
    }

    if (d.medicine) {
      history.push({
        pathname: "/item",
        state: {
          from: user,
          type: "info",
          allowAction: false,
          itemId: d.medicine._id,
          companyId: null,
          warehouseId: null,
        },
      });
    }
  };

  return data.length === 0 ? null : (
    <div className={styles.container}>
      <div className={styles.slicker}>
        <Slider {...settings}>
          {data?.map((d) => (
            <div key={d._id}>
              <div
                className={styles.img}
                onClick={() => {
                  advertisementClickHandler(d);
                }}
              >
                <img src={`${SERVER_URL}/${d.logo_url}`} alt="Thumb" />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default AdvertisementHomePage;
