import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// icons
import { RiDeleteBin5Fill } from "react-icons/ri";

// redux-stuff
import { useDispatch, useSelector } from "react-redux";
import { deleteAdvertisement } from "../../redux/advertisements/advertisementsSlice";
import { selectToken } from "../../redux/auth/authSlice";
import { Colors, SERVER_URL } from "../../utils/constants";

// components
import Modal from "../../modals/modal/modal.component";

// styles
import styles from "./advertisment-card.module.scss";
import Icon from "../icon/icon.component";

function AdvertisementCard({ advertisement }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const deleteAdvertisementHandler = () => {
    setShowConfirmModal(false);
    dispatch(deleteAdvertisement({ id: advertisement._id, token }));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.img}>
            <img
              src={`${SERVER_URL}/advertisements/${advertisement.logo_url}`}
              className={styles.image}
              alt="Thumb"
            />
          </div>
          <div className={styles.links_container}>
            {advertisement.company && (
              <p className={styles.value}>{advertisement.company?.name}</p>
            )}

            {advertisement.warehouse && (
              <p className={styles.value}>{advertisement.warehouse?.name}</p>
            )}

            {advertisement.medicine && (
              <p className={styles.value}>{advertisement.medicine?.name}</p>
            )}

            {!advertisement.company &&
              !advertisement.warehouse &&
              !advertisement.medicine && (
                <p className={styles.value}>{t("no-link")}</p>
              )}

            <Icon
              icon={() => (
                <RiDeleteBin5Fill color={Colors.FAILED_COLOR} size={24} />
              )}
              withBackground={true}
              onclick={() => {
                setShowConfirmModal(true);
              }}
            />
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <Modal
          header="delete-advertisement"
          cancelLabel="close-label"
          okLabel="ok-label"
          closeModal={() => {
            setShowConfirmModal(false);
          }}
          small={true}
          okModal={deleteAdvertisementHandler}
          color={Colors.FAILED_COLOR}
        >
          <p>{t("delete-advertisement-confirm-msg")}</p>
        </Modal>
      )}
    </>
  );
}

export default AdvertisementCard;
