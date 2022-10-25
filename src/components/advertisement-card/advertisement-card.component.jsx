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
import styles from "../new-advertisement/new-advertisement.module.scss";

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
      <div className={styles.new_advertisement_div}>
        <div className={styles.content}>
          <div className={styles.links}>
            <div className={styles.links_container}>
              {advertisement.company && (
                <div className={styles.row}>
                  <label>{t("company")}:</label>

                  <p>{advertisement.company?.name}</p>
                </div>
              )}

              {advertisement.warehouse && (
                <div className={styles.row}>
                  <label>{t("warehouse")}:</label>

                  <p>{advertisement.warehouse?.name}</p>
                </div>
              )}

              {advertisement.medicine && (
                <div className={styles.row}>
                  <label>{t("item-name")}:</label>

                  <p>{advertisement.medicine?.name}</p>
                </div>
              )}

              <div
                className={styles.delete}
                onClick={() => {
                  setShowConfirmModal(true);
                }}
              >
                <RiDeleteBin5Fill />
              </div>
            </div>
          </div>
          <div className={styles.img}>
            <img
              src={`${SERVER_URL}/advertisements/${advertisement.logo_url}`}
              className={styles.image}
              alt="Thumb"
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
