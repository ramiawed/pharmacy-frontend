import React from "react";
import GuestImage from "../../guest.png";

// styles
import styles from "./guest-introduce.module.scss";

function GuestIntroduce() {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <p>
          <label>التعرف على منتجات الشركات وتركيباتها واستطباباتها</label>
        </p>
        <p>
          <label>معرفة أسعار العموم</label>
        </p>
        <p>
          <label>
            التعرف على المنتجات الجديدة المطروحة بالسوق اضافة الى اهم الاخبار
          </label>
        </p>
      </div>
      <img
        src={GuestImage}
        style={{
          width: "250px",
          height: "250px",
          marginBlockEnd: "10px",
        }}
        alt="thumb"
        className={styles.img}
      />
    </div>
  );
}

export default GuestIntroduce;
