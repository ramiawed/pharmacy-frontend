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
  selectFavoritesPartners,
  removeFavorite,
} from "../../redux/favorites/favoritesSlice";
import { selectToken } from "../../redux/auth/authSlice";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./partner-card.module.scss";

// constants and utils
import { checkConnection } from "../../utils/checkInternet";
import { Colors, UserTypeConstants } from "../../utils/constants.js";
import { useHistory } from "react-router-dom";

function PartnerCard({ user }) {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoritesPartners);
  const token = useSelector(selectToken);

  const [connectionError, setConnectionError] = useState("");

  // method to handle add company to user's favorite
  const addCompanyToFavorite = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

    dispatch(addFavorite({ obj: { favoriteId: user._id }, token }));
  };

  // method to handle remove company from user's favorite
  const removeCompanyFromFavorite = () => {
    // check the internet connection
    if (!checkConnection()) {
      setConnectionError("no-internet-connection");
      return;
    }

    dispatch(removeFavorite({ obj: { favoriteId: user._id }, token }));
  };

  return (
    <div className={styles.partner_container}>
      {user.logo_url?.length > 0 ? (
        <p
          style={{
            backgroundImage: `url("http://localhost:8000/${user.logo_url}`,
          }}
          className={styles.partner_logo}
        ></p>
      ) : (
        <p
          style={{
            backgroundImage: 'url("http://localhost:8000/default-logo.jpg',
          }}
          className={styles.partner_logo}
        ></p>
      )}
      <p className={styles.partner_name}>{user.name}</p>
      <div className={styles.from_top}>
        <div className={styles.name}>{user.name}</div>
        <div
          className={[generalStyles.icon, generalStyles.fc_yellow].join(" ")}
        >
          {favorites.map((favorite) => favorite._id).includes(user._id) ? (
            <AiFillStar size={24} onClick={removeCompanyFromFavorite} />
          ) : (
            <AiOutlineStar size={24} onClick={addCompanyToFavorite} />
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
            onClick={() => {
              if (user.type === UserTypeConstants.COMPANY)
                history.push(`/companies/${user._id}`);
              else history.push(`/warehouses/${user._id}`);
            }}
          >
            {t("medicines")}
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

export default PartnerCard;
