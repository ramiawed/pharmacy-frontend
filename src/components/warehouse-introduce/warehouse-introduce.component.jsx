import React from "react";

import { FaWarehouse } from "react-icons/fa";

// styles
import styles from "./warehouse-introduce.module.scss";

function WarehouseIntroduce() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <FaWarehouse />
      </div>
      <h2>المستودعات</h2>
      <hr className={styles.separator} />
      <ul>
        <li>مراقبة ومتابعة الطلبات القادمة من الصيدليات</li>
        <li>إضافة عروض او حسومات على المنتجات المتوفرة لديك.</li>
        <li>
          التحكم الكامل بإضافة منتجات الشركات المتوفرة لديك الى قائمتك او حذفها.
        </li>
      </ul>
    </div>
  );
}

export default WarehouseIntroduce;
