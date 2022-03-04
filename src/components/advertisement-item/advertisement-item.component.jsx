import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../logo01.png";

// components

// redux-stuff
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import { statisticsItemFavorites } from "../../redux/statistics/statisticsSlice";

// styles
import styles from "./advertisement-item.module.scss";

// constants and utils
import { SERVER_URL, UserTypeConstants } from "../../utils/constants";

function AdvertisementItem({ item, contentColor }) {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const dispatchStatisticsHandler = () => {
    if (
      user.type === UserTypeConstants.PHARMACY ||
      user.type === UserTypeConstants.GUEST
    ) {
      dispatch(
        statisticsItemFavorites({
          obj: { itemId: item._id },
          token,
        })
      );
    }
  };

  return (
    <div className={styles.partner_container}>
      <div className={styles.logo_div}>
        {item.logo_url && item.logo_url !== "" ? (
          <img
            src={`${SERVER_URL}/items/${item.logo_url}`}
            className={styles.logo}
            alt="thumb"
          />
        ) : (
          <img src={Logo} className={styles.logo} alt="thumb" />
        )}
      </div>

      <div>
        <Link
          className={styles.content}
          style={{
            color: contentColor,
          }}
          onClick={dispatchStatisticsHandler}
          to={{
            pathname: "/item",
            state: {
              from: user.type,
              type: "info",
              allowAction: false,

              itemId: item._id,
              companyId: item.company._id,
              warehouseId:
                user.type === UserTypeConstants.WAREHOUSE ? user._id : null,
            },
          }}
        >
          {item.name}
        </Link>
      </div>
    </div>
  );
}

export default AdvertisementItem;
