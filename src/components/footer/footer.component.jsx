import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import LanguageChanger from "../language-changer/langauge-changer.component";
import ThemeChanger from "../theme-changer/theme-changer.component";
import Modal from "../../modals/modal/modal.component";

// react-icons
import {
  RiFacebookCircleFill,
  RiWhatsappFill,
  RiInstagramFill,
  RiTelegramFill,
} from "react-icons/ri";

// context
import { useTheme } from "../../contexts/themeContext";

function Footer() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [showWhatsappModal, setShowWhatsappModal] = useState();

  return (
    <>
      <div
        className={`mt-auto w-screen p-3 flex flex-col justify-center items-center text-sm ${
          theme === "light" ? "bg-main text-white" : "d-mixed100-primary300"
        }`}
      >
        <p>{t("contact us")}</p>
        <div className="flex items-center justify-center">
          <RiFacebookCircleFill
            size={24}
            className="cursor-pointer mx-1"
            onClick={() =>
              window.open(
                "https://www.facebook.com/Smart-Pharma-106820748580558/",
                "_blank"
              )
            }
          />
          <RiInstagramFill
            size={24}
            className="cursor-pointer mx-1"
            onClick={() =>
              window.open(
                "https://www.instagram.com/p/CZsAC7Rrocc/?utm_medium=copy_link",
                "_blank"
              )
            }
          />
          <RiTelegramFill
            size={24}
            className="cursor-pointer mx-1"
            onClick={() =>
              window.open("https://t.me/+8SM-2Zfg8fcyNDdk", "_blank")
            }
          />
          <RiWhatsappFill
            size={24}
            className="cursor-pointer mx-1"
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
        <div className="flex flex-row gap-4 p-2">
          <ThemeChanger />
          <LanguageChanger />
        </div>
      </div>

      {showWhatsappModal && (
        <Modal
          headerText="contact us"
          cancelText="close"
          closeHandler={() => {
            setShowWhatsappModal(false);
          }}
          showFooter={true}
        >
          <p
            className={`${
              theme === "light" ? "text-dark" : "text-color-primary-400"
            }`}
          >
            {t("contact us via whatsapp")}: {t("our phone number")}
          </p>
        </Modal>
      )}
    </>
  );
}

export default Footer;
