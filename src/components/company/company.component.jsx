import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// components
import Toast from "../toast/toast.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// redux-stuff
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  selectFavorites,
  removeFavorite,
} from "../../redux/favorites/favoritesSlice";
import { selectToken } from "../../redux/auth/authSlice";

// styles
import styles from "./company.module.scss";

// constants and utils
import { checkConnection } from "../../utils/checkInternet";
import { Colors } from "../../utils/constants.js";

function Company({ company }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const token = useSelector(selectToken);

  const [connectionError, setConnectionError] = useState("");

  // method to handle add company to user's favorite
  const addCompanyToFavorite = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

    dispatch(addFavorite({ obj: { favoriteId: company._id }, token }));
  };

  // method to handle remove company from user's favorite
  const removeCompanyFromFavorite = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

    dispatch(removeFavorite({ obj: { favoriteId: company._id }, token }));
  };

  return (
    <div className={styles.company_container}>
      {company.logo_url?.length > 0 ? (
        <></>
      ) : (
        <p
          style={{
            backgroundImage: 'url("http://localhost:8000/default-logo.jpg',
          }}
          className={styles.company_logo}
        ></p>
      )}
      <p className={styles.company_name}>{company.name}</p>
      <div className={styles.from_top}>
        <div className={styles.name}>{company.name}</div>
        <div>
          {favorites.map((favorite) => favorite._id).includes(company._id) ? (
            <AiFillStar
              className={[styles.icon, styles.fill_star].join(" ")}
              color="yellow"
              size={32}
              onClick={removeCompanyFromFavorite}
            />
          ) : (
            <AiOutlineStar
              className={styles.icon}
              color="yellow"
              size={32}
              onClick={addCompanyToFavorite}
            />
          )}
        </div>
        <div>
          <motion.button
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 8px rgb(255, 255, 255)",
              boxShadow: "0px 0px 8px rgb(0, 0, 0, 0.3)",
            }}
            className={styles.more_button}
          >
            {t("more")}
          </motion.button>
        </div>
      </div>

      {connectionError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            setConnectionError("");
          }}
        >
          <p>{t(connectionError)}</p>
        </Toast>
      )}
    </div>
  );
}

export default Company;
