import React from "react";

// styles
import styles from "./guest-introduce.module.scss";

function GuestIntroduce() {
  return (
    <div className={styles.container}>
      <h2>الضيوف</h2>
      <div className={styles.description}>
        <p>التعرف على منتجات الشركات وتركيباتها واستطباباتها</p>
        <p>معرفة أسعار العموم</p>
        <p className={styles.full_width}>
          التعرف على المنتجات الجديدة المطروحة بالسوق اضافة الى اهم الاخبار
        </p>
      </div>
    </div>
  );
}

export default GuestIntroduce;
