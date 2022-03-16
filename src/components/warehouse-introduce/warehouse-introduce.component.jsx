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
      <h2>المستودعات</h2>
      <div className={styles.description}>
        <p>مراقبة ومتابعة الطلبات القادمة من الصيدليات</p>
        <p>إضافة عروض او حسومات على المنتجات المتوفرة لديك.</p>
        <p className={styles.full_width}>
          التحكم الكامل بإضافة منتجات الشركات المتوفرة لديك الى قائمتك او حذفها.
        </p>
      </div>
    </div>
  );
}

export default WarehouseIntroduce;
