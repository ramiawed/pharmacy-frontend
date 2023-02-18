import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

// components
import Header from "../../components/header/header.component";
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

// components
import MainContentContainer from "../../components/main-content-container/main-content-container.component";

// constants
import { UserTypeConstants } from "../../utils/constants";

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
      <Header refreshHandler={refreshHandler} title="saved-items" />

      <MainContentContainer>
        {savedItems.map((si) => (
          <MedicineRow key={si._id} item={si} />
        ))}

        {savedItems.length === 0 && status !== "loading" && (
          <NoContent msg={t("no-saved-items")} />
        )}

        {status === "loading" && <ActionLoader allowCancel={false} />}
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default SavedItemsPage;
