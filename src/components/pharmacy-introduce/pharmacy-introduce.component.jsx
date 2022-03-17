import React from "react";

import { GiMedicines } from "react-icons/gi";

import styles from "./pharmacy-introduce.module.scss";

function PharmacyIntroduce() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <GiMedicines />
      </div>
      <h2>الصيدليات</h2>
      <hr
        style={{
          width: "80%",
          marginInline: "auto",
          marginBlock: "10px",
        }}
      />
      <ul>
        <li>امكانية التعرف والوصول الى أكثر من 12 ألف منتج</li>
        <li>
          البحث والتسوق والطلب بسلاسة وسهولة على مدار 24 ساعة وخلال أيام
          الأسبوع.
        </li>
        <li>خيارات بحث متعددة لتسهيل إمكانية الوصول لاحتياجك</li>
        <li>مراقبة حالة الطلبات من المستودعات.</li>
        <li>
          التعرف على المنتجات الجديدة وتحديثات الاسعار إضافة الى اهم الاخبار
        </li>
      </ul>
    </div>
  );
}

export default PharmacyIntroduce;
