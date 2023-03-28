import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Modal from "../../modals/modal/modal.component";

// react-icons
import {
  RiFacebookCircleFill,
  RiWhatsappFill,
  RiInstagramFill,
  RiTelegramFill,
} from "react-icons/ri";

// constants
import { Colors } from "../../utils/constants";

// styles
import styles from "./footer.module.scss";

function Footer() {
  const { t } = useTranslation();

  const [showWhatsappModal, setShowWhatsappModal] = useState();

  return (
    <>
      <div className={styles.footer_container}>
        <p>{t("contact us")}</p>
        <div className={styles.communication_info}>
          <RiFacebookCircleFill
            size={24}
            className={styles.icon}
            onClick={() =>
              window.open(
                "https://www.facebook.com/Smart-Pharma-106820748580558/",
                "_blank"
              )
            }
          />
          <RiInstagramFill
            size={24}
            className={styles.icon}
            onClick={() =>
              window.open(
                "https://www.instagram.com/p/CZsAC7Rrocc/?utm_medium=copy_link",
                "_blank"
              )
            }
          />
          <RiTelegramFill
            size={24}
            className={styles.icon}
            onClick={() =>
              window.open("https://t.me/+8SM-2Zfg8fcyNDdk", "_blank")
            }
          />
          <RiWhatsappFill
            size={24}
            className={styles.icon}
            onClick={() => {
              setShowWhatsappModal(true);
            }}
          />
        </div>
        <p
          style={{
            borderTop: "1px solid white",
            marginTop: "4px",
          }}
        >
          {t("copy right")}
        </p>
        <p>{t("developed by")}</p>
      </div>

      {showWhatsappModal && (
        <Modal
          header="contact us"
          cancelLabel="close"
          closeModal={() => {
            setShowWhatsappModal(false);
          }}
          small={true}
          color={Colors.LIGHT_COLOR}
        >
          <p>
            {t("contact us via whatsapp")}: {t("our phone number")}
          </p>
        </Modal>
      )}
    </>
  );
}

export default Footer;
