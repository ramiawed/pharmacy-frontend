import React from "react";
import styles from "./contact-us.module.scss";

import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function ContactUs() {
  return (
    <>
      <div className={styles.contact_us_row}>
        <FaUser />
        <p>رامي اويد</p>
      </div>

      <div className={styles.contact_us_row}>
        <FaPhoneAlt />
        <p>٠٩٣٢٤٥٢٥٣٠</p>
      </div>

      <div className={styles.contact_us_row}>
        <MdEmail />
        <p>ramiawed@gmail.com</p>
      </div>
    </>
  );
}

export default ContactUs;
