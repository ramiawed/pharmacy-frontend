import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import * as FileSaver from "file-saver";

// components
import CustomButton from "../custom-button/custom-button.component";
import Loader from "../action-loader/action-loader.component";
import Modal from "../../modals/modal/modal.component";
import Toast from "../toast/toast.component";

// redux stuff
import { selectToken } from "../../redux/auth/authSlice";
import { useSelector } from "react-redux";

// constants
import { Colors } from "../../utils/constants";

// icons
import { TiCancelOutline } from "react-icons/ti";

// context
import { useTheme } from "../../contexts/themeContext";

const BackupRestoreSection = ({ title, backupFromUrl, restoreToUrl }) => {
  const { theme } = useTheme();
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
    const partOfData = data.slice(startIndex, endIndex);

    setLoading(true);

    await axios
      .post(
        restoreToUrl,
        { partOfData, rest: stage === 0 },
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
      <li
        className={`relative flex flex-col md:border-none border m-2 rounded-md items-center gap-2 py-2 ps-3 md:flex-row ${
          theme === "light"
            ? "text-dark border-dark"
            : "text-color-primary-300 border-color-primary-300"
        }`}
      >
        <label className={`inline-block min-w-[150px] text-lg text-center`}>
          {t(title)}
        </label>
        <CustomButton
          text={t("backup button")}
          onClickHandler={() => {
            setShowConfirmModal(true);
          }}
          classname={`${
            theme === "light" ? "bg-green text-white" : "d-primary500-mixed300"
          }`}
        />

        <CustomButton
          text={t("restore")}
          onClickHandler={() => handleClick()}
          classname={`${
            theme === "light" ? "bg-dark text-white" : "d-primary500-mixed300"
          }`}
        />
        {data.length > 0 ? (
          stage < numberOfStage ? (
            <>
              <CustomButton
                text={`${stage + 1} ${t("from")} ${numberOfStage}`}
                onClickHandler={restoreHandler}
                classname={`${
                  theme === "light"
                    ? "bg-dark text-white"
                    : "d-primary500-mixed300"
                }`}
              />

              <label className="text-center">
                {t("you have finish all the stage to restore all information")}
              </label>

              <CustomButton
                icon={() => <TiCancelOutline size={24} />}
                onClickHandler={() => {
                  setShowConfirmCancelRestoreModel(true);
                }}
                classname={`bg-red text-white !absolute top-3 end-2 md:!relative md:top-0 md:end-0`}
                tooltip={t("cancel restore operation")}
              />
            </>
          ) : (
            <label className="text-center">{t("restore completed")}</label>
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
          showHeader={true}
          showFooter={true}
          headerText="backup header"
          cancelText="close"
          okText="ok"
          closeHandler={() => {
            setShowConfirmModal(false);
          }}
          okHandler={() => {
            setShowConfirmModal(false);
            exportToCSV(`${title}-${Date.now()}`);
          }}
        >
          <p
            className={`${
              theme === "light" ? "text-dark" : "text-color-primary-500"
            }`}
          >
            {t("do you want to take a backup of this section")}
          </p>
        </Modal>
      )}

      {showConfirmCancelRestoreModel && (
        <Modal
          showHeader={true}
          showFooter={true}
          headerText="backup header"
          cancelText="close"
          okText="ok"
          closeHandler={() => {
            setShowConfirmCancelRestoreModel(false);
          }}
          okHandler={() => {
            setShowConfirmCancelRestoreModel(false);
            setData([]);
            setStage(0);
          }}
        >
          <p
            className={`${
              theme === "light" ? "text-dark" : "text-color-primary-500"
            }`}
          >
            {t("cancel restore operation msg")}
          </p>
        </Modal>
      )}
    </>
  );
};

export default BackupRestoreSection;
