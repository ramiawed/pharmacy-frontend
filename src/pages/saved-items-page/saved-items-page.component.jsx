import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

// components
import Header from "../../components/header/header.component";
import Icon from "../../components/action-icon/action-icon.component";
import MedicineRow from "../../components/medicine-row/medicine-row.component";
import NoContent from "../../components/no-content/no-content.component";
import ActionLoader from "../../components/action-loader/action-loader.component";

// redux stuff
import { selectUserData } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getSavedItems,
  resetSavedItems,
  selectSavedItems,
} from "../../redux/savedItems/savedItemsSlice";

// icons
import { RiRefreshLine } from "react-icons/ri";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { Colors, UserTypeConstants } from "../../utils/constants";

function SavedItemsPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, token } = useSelector(selectUserData);
  const { savedItems, status } = useSelector(selectSavedItems);

  const refreshHandler = () => {
    dispatch(resetSavedItems);
    dispatch(getSavedItems({ token }));
  };

  useEffect(() => {
    onSelectedChange();
  }, []);

  return user && user.type === UserTypeConstants.PHARMACY ? (
    <>
      <Header>
        <h2>{t("saved-items")}</h2>
        <div className={generalStyles.refresh_icon}>
          <Icon
            selected={false}
            foreColor={Colors.WHITE_COLOR}
            tooltip={t("refresh-tooltip")}
            onclick={refreshHandler}
            icon={() => <RiRefreshLine />}
          />
        </div>
      </Header>
      <div
        className={generalStyles.container_with_header}
        style={{ paddingTop: "10px" }}
      >
        {savedItems.map((si) => (
          <MedicineRow key={si._id} item={si} />
        ))}
      </div>

      {savedItems.length === 0 && status !== "loading" && (
        <NoContent msg={t("no-saved-items")} />
      )}

      {status === "loading" && <ActionLoader allowCancel={false} />}
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default SavedItemsPage;
