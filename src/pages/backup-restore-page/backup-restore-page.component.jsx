import React from "react";

// components
import BackupRestoreSection from "../../components/backup-restore-section/backup-restore-section.component";
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import Header from "../../components/header/header.component";

// constants
import { BASEURL } from "../../utils/constants";

function BackupRestorePage() {
  return (
    <>
      <MainContentContainer>
        <Header title="backup and restore" />

        <ul>
          {/* users */}
          <BackupRestoreSection
            title="partners"
            backupFromUrl={`${BASEURL}/users/all`}
            restoreToUrl={`${BASEURL}/users/restore`}
          />

          {/* items */}
          <BackupRestoreSection
            title="items"
            backupFromUrl={`${BASEURL}/items/all`}
            restoreToUrl={`${BASEURL}/items/restore`}
          />

          {/* notifications */}
          <BackupRestoreSection
            title="notifications"
            backupFromUrl={`${BASEURL}/notifications/all`}
            restoreToUrl={`${BASEURL}/notifications/restore`}
          />

          {/* advertisements */}
          <BackupRestoreSection
            title="advertisements"
            backupFromUrl={`${BASEURL}/advertisement/all`}
            restoreToUrl={`${BASEURL}/advertisement/restore`}
          />

          {/* settings */}
          <BackupRestoreSection
            title="settings"
            backupFromUrl={`${BASEURL}/settings/all`}
            restoreToUrl={`${BASEURL}/settings/restore`}
          />

          {/* orders */}
          <BackupRestoreSection
            title="baskets"
            backupFromUrl={`${BASEURL}/baskets/all`}
            restoreToUrl={`${BASEURL}/baskets/restore`}
          />

          {/* orders */}
          <BackupRestoreSection
            title="orders"
            backupFromUrl={`${BASEURL}/orders/all`}
            restoreToUrl={`${BASEURL}/orders/restore`}
          />

          {/* special orders */}
          <BackupRestoreSection
            title="special orders"
            backupFromUrl={`${BASEURL}/ordered-baskets/all`}
            restoreToUrl={`${BASEURL}/ordered-baskets/restore`}
          />

          {/* favorites */}
          <BackupRestoreSection
            title="favorites"
            backupFromUrl={`${BASEURL}/favorites/all`}
            restoreToUrl={`${BASEURL}/favorites/restore`}
          />

          {/* saved items */}
          <BackupRestoreSection
            title="saved items"
            backupFromUrl={`${BASEURL}/savedItems/all`}
            restoreToUrl={`${BASEURL}/savedItems/restore`}
          />

          {/* statistics */}
          <BackupRestoreSection
            title="statistics"
            backupFromUrl={`${BASEURL}/statistics/all`}
            restoreToUrl={`${BASEURL}/statistics/restore`}
          />
        </ul>
      </MainContentContainer>
    </>
  );
}

export default BackupRestorePage;
