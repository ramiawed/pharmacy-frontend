import React from "react";
import { useTranslation } from "react-i18next";

// icons
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../utils/constants";

import { deleteAdvertisement } from "../../redux/advertisements/advertisementsSlice";
import { selectToken } from "../../redux/auth/authSlice";

// styles
import styles from "../new-advertisement/new-advertisement.module.scss";

function AdvertisementCard({ advertisement }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  return (
    <div
      className={styles.new_advertisement_div}
      style={{
        marginBottom: "10px",
      }}
    >
      <div className={styles.content}>
        <div
          className={styles.links}
          style={{
            width: "250px",
          }}
        >
          {advertisement.company && (
            <div className={styles.row}>
              <label>{t("company")}:</label>

              <p>{advertisement.company?.name}</p>
            </div>
          )}

          {advertisement.warehouse && (
            <div className={styles.row}>
              <label>{t("warehouse")}:</label>

              <p>{advertisement.warehouse?.name}</p>
            </div>
          )}

          {advertisement.medicine && (
            <div className={styles.row}>
              <label>{t("item-name")}:</label>

              <p>{advertisement.medicine?.name}</p>
            </div>
          )}

          <div className={styles.delete}>
            <RiDeleteBin5Fill
              size={96}
              onClick={() => {
                dispatch(deleteAdvertisement({ id: advertisement._id, token }));
              }}
            />
          </div>
        </div>
        <div className={styles.img}>
          <img
            src={`http://localhost:8000/${advertisement.logo_url}`}
            className={styles.image}
            alt="Thumb"
          />
        </div>
      </div>
    </div>
  );
}

export default AdvertisementCard;
