import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import * as FileSaver from "file-saver";

// redux stuff
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";

import styles from "./backup-restore-section.module.scss";
import Loader from "../action-loader/action-loader.component";
import Toast from "../toast/toast.component";

import { Colors } from "../../utils/constants";
import Modal from "../../modals/modal/modal.component";
import Icon from "../icon/icon.component";
import { RiDeleteBin5Fill } from "react-icons/ri";

const BackupRestoreSection = ({ title, backupFromUrl, restoreToUrl }) => {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const inputFileRef = useRef(null);

  const fileType = "application/json";
  const fileExtension = ".json";

  const [data, setData] = useState([]);
  const [stage, setStage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [failedMsg, setFailedMsg] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmCancelRestoreModel, setShowConfirmCancelRestoreModel] =
    useState(false);

  const numberOfStage = Math.ceil(data.length / 500);

  const restoreHandler = async () => {
    const startIndex = stage * 500;
    const endIndex = startIndex + 500;
    const data = data.slice(startIndex, endIndex);

    setLoading(true);

    await axios
      .post(
        restoreToUrl,
        { data, rest: stage === 0 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        setStage((prev) => prev + 1);
        setSuccessMsg("success");
      })
      .catch(() => {
        setLoading(false);
        setFailedMsg("failed");
      });
  };

  const exportToCSV = async (fileName) => {
    setLoading(true);
    await axios
      .get(backupFromUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        const data = new Blob([JSON.stringify(response.data.data.data)], {
          type: fileType,
        });

        FileSaver.saveAs(data, fileName + fileExtension);
        setLoading(false);
      });
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setStage(0);
    setData([]);
    if (uploadedFile) {
      setLoading(true);
      const fileReader = new FileReader();

      fileReader.onload = async function () {
        let response = JSON.parse(fileReader.result);
        if (title === "partners")
          response = response.map((res) => {
            return {
              ...res,
              passwordConfirm: res.password,
            };
          });

        console.log(response);
        setData(response);
        setLoading(false);
      };

      fileReader.readAsText(uploadedFile, "UTF-8");
    }
  };

  const handleClick = () => {
    inputFileRef.current.click();
  };

  return (
    <>
      <li className={styles.listItem}>
        <label>{t(title)}</label>
        <button
          className={styles.backup_button}
          onClick={() => {
            setShowConfirmModal(true);
          }}
        >
          {t("backup-button")}
        </button>
        <button className={styles.restore_button} onClick={() => handleClick()}>
          {t("restore-button")}
        </button>
        {data.length > 0 ? (
          stage < numberOfStage ? (
            <>
              <button
                className={styles.restore_button}
                onClick={restoreHandler}
              >
                {stage + 1} من {numberOfStage}
              </button>
              <label>
                {t("you have finish all the stage to restore all information")}
              </label>
              <Icon
                icon={() => <RiDeleteBin5Fill size={24} />}
                onclick={() => {
                  setShowConfirmCancelRestoreModel(true);
                }}
                tooltip={t("cancel restore operation")}
                foreColor={Colors.FAILED_COLOR}
              />
            </>
          ) : (
            <label>{t("restore completed")}</label>
          )
        ) : (
          <></>
        )}
      </li>

      <input
        type="file"
        accept="application/JSON"
        ref={inputFileRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {loading && (
        <Loader
          onclick={() => {}}
          allowCancel={false}
          msg1="it will takes some time to finish the operation"
          msg2="please wait"
        />
      )}
      {successMsg.length > 0 && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor={Colors.WHITE_COLOR}
          toastText={t(successMsg)}
          actionAfterTimeout={() => setSuccessMsg("")}
        />
      )}

      {failedMsg.length > 0 && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor={Colors.WHITE_COLOR}
          toastText={t(failedMsg)}
          actionAfterTimeout={() => setFailedMsg("")}
        />
      )}

      {showConfirmModal && (
        <Modal
          header="backup header"
          cancelLabel="close-label"
          okLabel="ok-label"
          closeModal={() => {
            setShowConfirmModal(false);
          }}
          small={true}
          okModal={() => {
            setShowConfirmModal(false);
            exportToCSV(`${title}-${Date.now()}`);
          }}
          color={Colors.MAIN_COLOR}
        >
          <p>{t("do you want to take a backup of this section")}</p>
        </Modal>
      )}

      {showConfirmCancelRestoreModel && (
        <Modal
          header="backup header"
          cancelLabel="close-label"
          okLabel="ok-label"
          closeModal={() => {
            setShowConfirmCancelRestoreModel(false);
          }}
          small={true}
          okModal={() => {
            setShowConfirmCancelRestoreModel(false);
            setData([]);
            setStage(0);
          }}
          color={Colors.MAIN_COLOR}
        >
          <p>{t("cancel restore operation msg")}</p>
        </Modal>
      )}
    </>
  );
};

export default BackupRestoreSection;
