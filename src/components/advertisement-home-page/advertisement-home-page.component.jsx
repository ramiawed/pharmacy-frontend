import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Slider from "react-slick";
import { selectUser } from "../../redux/auth/authSlice";

import styles from "./advertisement-home-page.module.scss";

function AdvertisementHomePage({ data }) {
  const [width, setWidth] = useState(window.innerWidth);
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

  const advertisementClickHandler = (d) => {
    console.log(d);
    if (d.warehouse && d.warehouse.allowShowingMedicines) {
      history.push({
        pathname: "/medicines",
        state: {
          companyId: null,
          warehouseId: d.warehouse._id,
        },
      });
    }

    if (d.company) {
      history.push({
        pathname: "/medicines",
        state: {
          companyId: d.company._id,
          warehouseId: null,
        },
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
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    advertisementClickHandler(d);
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
