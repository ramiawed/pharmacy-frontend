import React, { useEffect, useRef, useState } from "react";

import LogoWithDotsImage from "../../sign-in-out-image.jpg";
import OrderOnlineImage from "../../order-online.jpg";
import WarehouseWithOffersImage from "../../warehouses-with-offers.jpg";
import FreeServicesImage from "../../free-services.jpg";

import styles from "./advertisements-home-page.module.scss";

let timer = null;

function AdvertisementsHomePage({ advertisements }) {
  const backgrounds = [
    LogoWithDotsImage,
    OrderOnlineImage,
    WarehouseWithOffersImage,
    FreeServicesImage,
    ...advertisements,
  ];
  const [index, setIndex] = useState(0);
  const i = useRef(0);

  const startTimer = () => {
    timer = setInterval(() => {
      i.current = i.current === backgrounds.length - 1 ? 0 : i.current + 1;

      setIndex(i.current);
    }, 7000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <div
          className={[styles.bottom_image].join(" ")}
          style={{
            backgroundImage: `url(${backgrounds[index]})`,
          }}
        ></div>
        <div
          onMouseEnter={() => {
            clearInterval(timer);
          }}
          onMouseLeave={() => {
            startTimer();
          }}
          className={styles.top_image}
          style={{
            backgroundImage: `url(${backgrounds[index]})`,
          }}
        ></div>
      </div>
      <div className={styles.dots}>
        {backgrounds.map((b, index) => (
          <div
            className={[
              styles.dot,
              index === i.current ? styles.selected : "",
            ].join(" ")}
            key={index}
            onClick={() => {
              clearInterval(timer);
              i.current = index;
              setIndex(i.current);
              startTimer();
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default AdvertisementsHomePage;
