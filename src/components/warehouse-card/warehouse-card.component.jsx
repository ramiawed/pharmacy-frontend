import { useState } from "react";

// constanta
import { SERVER_URL, UserTypeConstants } from "../../utils/constants";
import Logo from "../../assets/transparent_logo.png";

// icons
import { useHistory } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// context
import { useTheme } from "../../contexts/themeContext";

// components
import CustomButton from "../custom-button/custom-button.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  isInFavoritePartner,
  removeFavorite,
} from "../../redux/favorites/favoritesSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import { useTranslation } from "react-i18next";
import { selectSettings } from "../../redux/settings/settingsSlice";
import { resetMedicines } from "../../redux/medicines/medicinesSlices";

function WarehouseCard({ partner }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    settings: { showWarehouseItem },
  } = useSelector(selectSettings);

  const { token, user } = useSelector(selectUserData);
  const isFavorite = useSelector((state) =>
    isInFavoritePartner(state, partner._id)
  );
  const [loading, setLoading] = useState(false);

  function goToCompanyItems() {
    if (
      user.type === UserTypeConstants.WAREHOUSE ||
      user.type === UserTypeConstants.GUEST ||
      user.type === UserTypeConstants.COMPANY
    )
      return;

    if (showWarehouseItem && partner.allowShowingMedicines) {
      if (user.type === UserTypeConstants.PHARMACY) {
        dispatch(
          addStatistics({
            obj: {
              sourceUser: user._id,
              targetUser: partner._id,
              action: "choose-company",
            },
            token,
          })
        );
      }
      dispatch(resetMedicines());

      history.push({
        pathname: `/medicines`,
        search: `?warehouse=${partner._id}`,
        state: { myCompanies: partner.ourCompanies },
      });
    }
  }

  function addPartnerToFavoriteHandler(e) {
    e.stopPropagation();

    setLoading(true);
    dispatch(addFavorite({ obj: { favoriteId: partner._id }, token }))
      .then(unwrapResult)
      .then(() => {
        dispatch(
          addStatistics({
            obj: {
              sourceUser: user._id,
              targetUser: partner._id,
              action: "user-added-to-favorite",
            },
            token,
          })
        );
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function actionHandler(e, handler, body) {
    e.stopPropagation();
    setLoading(true);

    dispatch(handler(body))
      .then(unwrapResult)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <div
      className={`flex flex-col group rounded-md cursor-pointer  transition-colors relative ${
        theme === "light"
          ? "border text-dark border-light_grey bg-white hover:border-light"
          : "d-mixed300-primary300 hover:border border-color-primary-100"
      }`}
      onClick={goToCompanyItems}
    >
      <div
        className={`h-16 rounded-t-md duration-300 relative flex justify-center items-center transition-colors ${
          theme === "light"
            ? "bg-light_grey group-hover:bg-light"
            : "bg-color-surface-200 group-hover:bg-color-primary-100"
        }`}
      >
        {partner.logo_url?.length > 0 ? (
          <img
            className="bg-white rounded-full absolute w-[64px] h-[64px] object-fill translate-y-[32px] border-b"
            src={`${SERVER_URL}/profiles/${partner.logo_url}`}
            alt="thumb"
          />
        ) : (
          <img
            className="bg-white rounded-full absolute w-[64px] h-[64px] object-fill translate-y-[32px] border-b"
            src={Logo}
            alt="thumb"
          />
        )}
      </div>
      <div className="h-24 rounded-md flex justify-center items-center translate-y-[8px]">
        <label className="bold text-lg text-center group-hover:cursor-pointer">
          {partner.name}
        </label>
      </div>

      <div className="absolute top-2 end-2 z-[1] p-2 flex flex-row gap-[5px] ">
        {isFavorite ? (
          <CustomButton
            icon={() => <AiFillStar />}
            onClickHandler={(e) =>
              actionHandler(e, removeFavorite, {
                obj: { favoriteId: partner._id },
                token,
              })
            }
            classname={`${
              theme === "light"
                ? "bg-yellow text-white"
                : "d-primary500-mixed300"
            }`}
            disabled={loading}
            tooltip={t("remove from favorites")}
          />
        ) : (
          <CustomButton
            icon={() => <AiOutlineStar />}
            onClickHandler={(e) => addPartnerToFavoriteHandler(e)}
            classname={`${
              theme === "light"
                ? "bg-yellow text-white"
                : "d-primary500-mixed300"
            }`}
            disabled={loading}
            tooltip={t("add to favorites")}
          />
        )}
      </div>
    </div>
  );
}

export default WarehouseCard;
