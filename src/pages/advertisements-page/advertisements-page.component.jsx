import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// redux stufff
import { useDispatch, useSelector } from "react-redux";
import {
  resetError,
  selectAdvertisements,
} from "../../redux/advertisements/advertisementsSlice";

// components
import AdvertisementPageHeader from "../../components/advertisement-page-header/advertisement-page-header.component";
import NewAdvertisement from "../../components/new-advertisement/new-advertisement.component";
import Loader from "../../components/action-loader/action-loader.component";
import Toast from "../../components/toast/toast.component";
import AdvertisementCard from "../../components/advertisement-card/advertisement-card.component";

// styles
import styles from "./advertisements-page.module.scss";
import generalStyles from "../../style.module.scss";

// constants
import { Colors } from "../../utils/constants";

function AdvertisementsPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { status, error, advertisements } = useSelector(selectAdvertisements);

  // own states
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className={generalStyles.container}>
        <AdvertisementPageHeader isNew={isNew} setIsNew={setIsNew} />
        <NewAdvertisement isNew={isNew} setIsNew={setIsNew} />
        {advertisements.map((adv) => (
          <AdvertisementCard advertisement={adv} key={adv._id} />
        ))}
      </div>
      {status === "loading" && <Loader />}
      {error && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(error)}
          actionAfterTimeout={() => dispatch(resetError())}
        />
      )}
    </>
  );
}

export default AdvertisementsPage;
