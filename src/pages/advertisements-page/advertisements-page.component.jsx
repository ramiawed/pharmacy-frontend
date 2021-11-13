import React from "react";

// components
import AdvertisementPageHeader from "../../components/advertisement-page-header/advertisement-page-header.component";

// styles
import styles from "./advertisements-page.module.scss";
import generalStyles from "../../style.module.scss";
import NewAdvertisement from "../../components/new-advertisement/new-advertisement.component";

function AdvertisementsPage() {
  return (
    <div className={generalStyles.container}>
      <AdvertisementPageHeader />
      <NewAdvertisement />
    </div>
  );
}

export default AdvertisementsPage;
