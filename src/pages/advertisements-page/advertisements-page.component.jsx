import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// redux stufff
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOperation,
  resetError,
  selectAdvertisements,
} from "../../redux/advertisements/advertisementsSlice";

// components
import AdvertisementPageHeader from "../../components/advertisement-page-header/advertisement-page-header.component";
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import AdvertisementCard from "../../components/advertisement-card/advertisement-card.component";
import NewAdvertisement from "../../components/new-advertisement/new-advertisement.component";
import Loader from "../../components/action-loader/action-loader.component";
import NoContent from "../../components/no-content/no-content.component";
import Toast from "../../components/toast/toast.component";

// constants
import { Colors } from "../../utils/constants";

function AdvertisementsPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { status, error, advertisements } = useSelector(selectAdvertisements);

  // own states
  const [isNew, setIsNew] = useState(false);

  const cancelOperationHandler = () => {
    cancelOperation();
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    onSelectedChange();
  }, []);

  return (
    <>
      <AdvertisementPageHeader isNew={isNew} setIsNew={setIsNew} />
      <MainContentContainer>
        {advertisements.length === 0 && !isNew && (
          <NoContent msg={t("no advertisements")} />
        )}

        {advertisements.map((adv) => (
          <AdvertisementCard advertisement={adv} key={adv._id} />
        ))}
      </MainContentContainer>

      {status === "loading" && (
        <Loader allowCancel={true} onclick={cancelOperationHandler} />
      )}

      {error && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(error)}
          actionAfterTimeout={() => dispatch(resetError())}
        />
      )}

      {isNew && (
        <NewAdvertisement
          closeHandler={setIsNew}
          header={"new advertisement"}
        />
      )}
    </>
  );
}

export default AdvertisementsPage;
