import React from "react";
import { useTranslation } from "react-i18next";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { motion } from "framer-motion";

import styles from "./company.module.scss";

function Company({ company }) {
  const { t } = useTranslation();
  return (
    <div className={styles.company_container}>
      {company.logo_url?.length > 0 ? (
        <></>
      ) : (
        <p
          style={{
            backgroundImage: 'url("http://localhost:8000/default-logo.jpg',
          }}
          className={styles.company_logo}
        ></p>
      )}
      <p className={styles.company_name}>{company.name}</p>
      <div className={styles.from_top}>
        <div>{company.name}</div>
        <div>
          {company.name.startsWith("ر") ? (
            <AiFillStar
              className={[styles.hidden, styles.fill_star].join(" ")}
              color="yellow"
              size={32}
            />
          ) : (
            <AiOutlineStar className={styles.hidden} color="yellow" size={32} />
          )}
        </div>
        <div>
          <motion.button
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 8px rgb(255, 255, 255)",
              boxShadow: "0px 0px 8px rgb(0, 0, 0, 0.3)",
            }}
            className={styles.more_button}
          >
            {t("more")}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Company;
