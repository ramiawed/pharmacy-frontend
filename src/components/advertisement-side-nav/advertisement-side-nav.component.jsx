import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Colors } from "../../utils/constants";
import AdvertisementItem from "../advertisement-item/advertisement-item.component";
import AdvertisementPartner from "../advertisement-partner/advertisement-partner.component";

import styles from "./advertisement-side-nav.module.scss";

function AdvertisementSideNav({
  header,
  description,
  data,
  closeAction,
  type,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.close_icon} onClick={closeAction}>
        <AiFillCloseCircle size={24} color={Colors.FAILED_COLOR} />
      </div>
      <h2>{header}</h2>
      <h3>{description}</h3>
      <div className={styles.data}>
        {data.map((d, index) => (
          <div key={index} className={styles.data_container}>
            {type === "partner" ? (
              <AdvertisementPartner user={d} />
            ) : (
              <AdvertisementItem item={d} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdvertisementSideNav;
