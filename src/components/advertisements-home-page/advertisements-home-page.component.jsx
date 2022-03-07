import React, { useEffect, useRef, useState } from "react";

import Logo02 from "../../warehouses-with-offers.jpg";
import Logo from "../../logo.jpg";
import Logo01 from "../../order-online.jpg";

import styles from "./advertisements-home-page.module.scss";

function AdvertisementsHomePage() {
  const backgrounds = [Logo, Logo01, Logo02, Logo, Logo01, Logo02];
  const [index, setIndex] = useState(0);
  const i = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      i.current = i.current === 5 ? 0 : i.current + 1;

      setIndex(i.current);
    }, 7000);

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
          className={[styles.bottom_image_2].join(" ")}
          style={{
            backgroundImage: `url(${backgrounds[index]})`,
          }}
        ></div>
        <div
          className={styles.top_image}
          style={{
            backgroundImage: `url(${backgrounds[index]})`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default AdvertisementsHomePage;
