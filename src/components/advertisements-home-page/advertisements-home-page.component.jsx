import React, { useCallback, useEffect, useRef, useState } from "react";

import Logo02 from "../../warehouses-with-offers.jpg";
import Logo from "../../logo.jpg";
import Logo01 from "../../order-online.jpg";
import ComingSoonLogo from "../../coming-soon.jpg";
import FacebookLogo from "../../facebook.jpg";
import Online24 from "../../online24.jpg";
import UglyImage1 from "../../ugly-image-1.jpeg";
import UglyImage2 from "../../ugly-image-2.jpeg";

import styles from "./advertisements-home-page.module.scss";

let timer = null;

function AdvertisementsHomePage({ advertisements }) {
  const backgrounds = [
    Logo,
    Logo01,
    Logo02,
    ComingSoonLogo,
    FacebookLogo,
    Online24,
    UglyImage1,
    UglyImage2,
    ...advertisements,
  ];
  const [index, setIndex] = useState(0);
  const i = useRef(0);

  const startTimer = useCallback(() => {
    timer = setInterval(() => {
      i.current = i.current === backgrounds.length - 1 ? 0 : i.current + 1;

      setIndex(i.current);
    }, 7000);
  }, [backgrounds.length]);

  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(timer);
    };
  }, [startTimer]);

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
