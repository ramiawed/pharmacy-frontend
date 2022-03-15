import React from "react";
import WarehouseImage from "../../warehouse01.png";

// icons
import { AiFillControl } from "react-icons/ai";
import { GoWatch } from "react-icons/go";
import { BsFillBookmarkPlusFill } from "react-icons/bs";

// styles
import styles from "./warehouse-introduce.module.scss";

function WarehouseIntroduce() {
  return (
    <div className={styles.container}>
      <img
        src={WarehouseImage}
        style={{
          width: "250px",
          height: "250px",
          marginBlockEnd: "10px",
        }}
        alt="thumb"
      />
      <div className={styles.description}>
        <p>
          <label className={styles.icon}>
            <AiFillControl size={24} />
          </label>
          <label>
            التحكم الكامل بإضافة منتجات الشركات المتوفرة لديك الى قائمتك او
            حذفها.
          </label>
        </p>
        <p>
          <label className={styles.icon}>
            <BsFillBookmarkPlusFill size={24} />
          </label>
          <label>إضافة عروض او حسومات على المنتجات المتوفرة لديك.</label>
        </p>
        <p>
          <label className={styles.icon}>
            <GoWatch size={24} />
          </label>
          <label>مراقبة ومتابعة الطلبات القادمة من الصيدليات</label>
        </p>
      </div>
    </div>
  );
}

export default WarehouseIntroduce;
