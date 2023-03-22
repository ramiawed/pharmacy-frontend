import React, { useEffect, useRef, useState } from "react";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  resetMedicines,
  setSearchCompanyId,
  setSearchWarehouseId,
} from "../../redux/medicines/medicinesSlices";

// constants
import { SERVER_URL } from "../../utils/constants";

// styles
import styles from "./advertisements-home-page.module.scss";

let timer = null;

function AdvertisementsHomePage({ advertisements }) {
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  const { user } = useSelector(selectUserData);

  // own state
  const [index, setIndex] = useState(0);

  const i = useRef(0);

  const startTimer = () => {
    timer = setInterval(() => {
      i.current = i.current === advertisements.length - 1 ? 0 : i.current + 1;

      setIndex(i.current);
    }, 10000);
  };

  const onAdvertisementPressHandler = (adv) => {
    if (adv.company !== null) {
      dispatch(resetMedicines());
      dispatch(setSearchCompanyId(adv.company._id));
      history.push({
        pathname: "/medicines",
        state: { myCompanies: [] },
      });
    }

    if (adv.warehouse !== null) {
      dispatch(resetMedicines());
      dispatch(setSearchWarehouseId(adv.warehouse._id));
      history.push({
        pathname: "/medicines",
        state: { myCompanies: adv.warehouse.ourCompanies },
      });
    }

    if (adv.medicine !== null) {
      dispatch(resetMedicines());
      history.push("/item", {
        from: user.type,
        type: "info",
        allowAction: false,
        itemId: adv.medicine._id,
        companyId: null,
        warehouseId: null,
      });
    }
  };

  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(timer);
    };
  }, []);

  return advertisements.length === 0 ? (
    <></>
  ) : (
    <div className={styles.container}>
      {advertisements.map((adv, i) => (
        <div
          key={i}
          onMouseEnter={() => {
            clearInterval(timer);
          }}
          onMouseLeave={() => {
            startTimer();
          }}
          onClick={() => onAdvertisementPressHandler(adv)}
          className={[
            styles.image,
            index === i ? styles.show : styles.hide,
          ].join(" ")}
        >
          <img src={`${SERVER_URL}advertisements/${adv.logo_url}`} alt="adv" />
        </div>
      ))}

      <div className={styles.dots}>
        {advertisements.map((b, index) => (
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
