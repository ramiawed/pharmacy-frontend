import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

// components
import Header from "../../components/header/header.component";
import Loader from "../../components/action-loader/action-loader.component";

// styles
import styles from "./backup-restore-page.module.scss";
import generalStyles from "../../style.module.scss";

// redux stuff
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";

// constants
import { BASEURL } from "../../utils/constants";

function BackupRestorePage() {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const inputFileRef = useRef(null);
  const restoreFrom = useRef("");

  const fileType = "application/json";
  const fileExtension = ".json";

  const [loading, setLoading] = useState(false);

  const exportToCSV = async (url, fileName) => {
    setLoading(true);
    await axios
      .get(url, {
        // timeout: 10000,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        // const ws = XLSX.utils.json_to_sheet(response.data.data.data);

        // const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

        // const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

        const data = new Blob([JSON.stringify(response.data.data.data)], {
          type: fileType,
        });

        FileSaver.saveAs(data, fileName + fileExtension);
        setLoading(false);
      });
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setLoading(true);
      const fileReader = new FileReader();

      fileReader.onload = async function () {
        const result = JSON.parse(fileReader.result);
        if (restoreFrom.current === "users") {
          await axios.post(
            `${BASEURL}/users/restore`,
            result.map((r) => {
              return {
                ...r,
                passwordConfirm: r.password,
              };
            }),
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setLoading(false);
        }

        if (restoreFrom.current === "settings") {
          await axios.post(`${BASEURL}/settings/restore`, result, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLoading(false);
        }

        if (restoreFrom.current === "notifications") {
          await axios.post(`${BASEURL}/notifications/restore`, result, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLoading(false);
        }

        if (restoreFrom.current === "advertisements") {
          await axios.post(`${BASEURL}/advertisement/restore`, result, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLoading(false);
        }

        if (restoreFrom.current === "orders") {
          await axios.post(`${BASEURL}/orders/restore`, result, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLoading(false);
        }

        if (restoreFrom.current === "favorites") {
          await axios.post(`${BASEURL}/favorites/restore`, result, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLoading(false);
        }

        if (restoreFrom.current === "statistics") {
          await axios.post(`${BASEURL}/statistics/restore`, result, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLoading(false);
        }

        if (restoreFrom.current === "items") {
          await axios.post(`${BASEURL}/items/restore`, result, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLoading(false);
        }
      };

      fileReader.readAsText(uploadedFile, "UTF-8");
    }
  };

  const handleClick = (arg) => {
    restoreFrom.current = arg;
    inputFileRef.current.click();
  };

  return (
    <>
      <Header>
        <h2>{t("backup-restore")}</h2>
      </Header>

      <div className={generalStyles.container_with_header}>
        <div>
          <ul className={styles.ul}>
            {/* users */}
            <li>
              <label>{t("partners")}</label>
              <button
                className={styles.backup_button}
                onClick={() => {
                  exportToCSV(`${BASEURL}/users/all`, `partners-${Date.now()}`);
                }}
              >
                {t("backup-button")}
              </button>
              <button
                className={styles.restore_button}
                onClick={() => handleClick("users")}
              >
                {t("restore-button")}
              </button>
            </li>
            {/* items */}
            <li>
              <label>{t("items")}</label>
              <button
                className={styles.backup_button}
                onClick={() => {
                  exportToCSV(`${BASEURL}/items/all`, `items-${Date.now()}`);
                }}
              >
                {t("backup-button")}
              </button>
              <button
                className={styles.restore_button}
                onClick={() => handleClick("items")}
              >
                {t("restore-button")}
              </button>
            </li>
            {/* notifications */}
            <li>
              <label>{t("notifications")}</label>
              <button
                className={styles.backup_button}
                onClick={() => {
                  exportToCSV(
                    `${BASEURL}/notifications/all`,
                    `notifications-${Date.now()}`
                  );
                }}
              >
                {t("backup-button")}
              </button>
              <button
                className={styles.restore_button}
                onClick={() => handleClick("notifications")}
              >
                {t("restore-button")}
              </button>
            </li>
            {/* advertisements */}
            <li>
              <label>{t("advertisements")}</label>
              <button
                className={styles.backup_button}
                onClick={() => {
                  exportToCSV(
                    `${BASEURL}/advertisement/all`,
                    `advertisements-${Date.now()}`
                  );
                }}
              >
                {t("backup-button")}
              </button>
              <button
                className={styles.restore_button}
                onClick={() => handleClick("advertisements")}
              >
                {t("restore-button")}
              </button>
            </li>
            {/* settings */}
            <li>
              <label>{t("settings")}</label>
              <button
                className={styles.backup_button}
                onClick={() => {
                  exportToCSV(
                    `${BASEURL}/settings/all`,
                    `settings-${Date.now()}`
                  );
                }}
              >
                {t("backup-button")}
              </button>
              <button
                className={styles.restore_button}
                onClick={() => handleClick("settings")}
              >
                {t("restore-button")}
              </button>
            </li>
            {/* orders */}
            <li>
              <label>{t("orders")}</label>
              <button
                className={styles.backup_button}
                onClick={() => {
                  exportToCSV(`${BASEURL}/orders/all`, `orders-${Date.now()}`);
                }}
              >
                {t("backup-button")}
              </button>
              <button
                className={styles.restore_button}
                onClick={() => handleClick("orders")}
              >
                {t("restore-button")}
              </button>
            </li>
            {/* favorites */}
            <li>
              <label>{t("favorites")}</label>
              <button
                className={styles.backup_button}
                onClick={() => {
                  exportToCSV(
                    `${BASEURL}/favorites/all`,
                    `favorites-${Date.now()}`
                  );
                }}
              >
                {t("backup-button")}
              </button>
              <button
                className={styles.restore_button}
                onClick={() => handleClick("favorites")}
              >
                {t("restore-button")}
              </button>
            </li>
            {/* statistics */}
            <li>
              <label>{t("statistics")}</label>
              <button
                className={styles.backup_button}
                onClick={() => {
                  exportToCSV(
                    `${BASEURL}/statistics/all`,
                    `statistics-${Date.now()}`
                  );
                }}
              >
                {t("backup-button")}
              </button>
              <button
                className={styles.restore_button}
                onClick={() => handleClick("statistics")}
              >
                {t("restore-button")}
              </button>
            </li>
          </ul>
        </div>
        <div></div>
      </div>

      <input
        type="file"
        accept="application/JSON"
        ref={inputFileRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {loading && <Loader onclick={() => {}} allowCancel={false} />}
    </>
  );
}

export default BackupRestorePage;
