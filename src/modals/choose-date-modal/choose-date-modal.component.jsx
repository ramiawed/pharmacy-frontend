import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Separator from "../../components/separator/separator.component";
import Modal from "../modal/modal.component";

import styles from "./choose-date-modal.module.scss";

const ChooseDateModal = ({ closeModal, header, msg, handler, withTime }) => {
  const { t } = useTranslation();

  const [disableDate, setDisableDate] = useState(true);
  const [disableTime, setDisableTime] = useState(true);

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const okHandler = () => {
    handler(!disableDate ? date : undefined, !disableTime ? time : undefined);
    closeModal();
  };

  return (
    <Modal
      header={t(header)}
      closeModal={closeModal}
      cancelLabel={t("cancel")}
      okLabel={t("ok")}
      small={true}
      okModal={okHandler}
    >
      <div className={styles.container}>
        <p>{t(msg)}</p>
        <div className={styles.row}>
          <input
            type="checkbox"
            checked={!disableDate}
            onChange={() => setDisableDate(!disableDate)}
            id="date"
          />
          <label htmlFor="date">{t("date")}</label>
          <input
            type="date"
            className={styles.input}
            disabled={disableDate}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        {withTime && (
          <>
            <Separator />
            <div className={styles.row}>
              <input
                type="checkbox"
                checked={!disableTime}
                onChange={() => setDisableTime(!disableTime)}
                id="time"
              />
              <label htmlFor="time">{t("time")}</label>
              <input
                type="time"
                className={styles.input}
                disabled={disableTime}
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ChooseDateModal;
