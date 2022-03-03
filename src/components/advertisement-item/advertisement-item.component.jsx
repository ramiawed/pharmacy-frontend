import React from "react";
import { Link } from "react-router-dom";
import DefaultLogo from "../../logo01.png";

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
        <img
          src={
            user.logo_url.length > 0
              ? `url("${SERVER_URL}profiles/${user.logo_url}")`
              : `${DefaultLogo}`
          }
          alt="thumb"
        />
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

      {/* {showModal && (
        <AddToCartModal item={item} close={() => setShowModal(false)} />
      )} */}
    </div>
  );
}

export default AdvertisementItem;
