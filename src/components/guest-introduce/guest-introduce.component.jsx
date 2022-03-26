import React from "react";

import { IoIosPeople } from "react-icons/io";

// styles
import styles from "./guest-introduce.module.scss";

function GuestIntroduce() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <IoIosPeople />
      </div>
      <h2>الضيوف</h2>
      <hr className={styles.separator} />
      <ul>
        <li>التعرف على منتجات الشركات وتركيباتها واستطباباتها</li>
        <li>معرفة أسعار العموم</li>
        <li>
          التعرف على المنتجات الجديدة المطروحة بالسوق اضافة الى اهم الاخبار
        </li>
      </ul>
    </div>
  );
}

export default GuestIntroduce;
