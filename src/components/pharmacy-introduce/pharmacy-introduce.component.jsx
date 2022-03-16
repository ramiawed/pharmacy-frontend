import React from "react";
import styles from "./pharmacy-introduce.module.scss";

function PharmacyIntroduce() {
  return (
    <div className={styles.container}>
      <h2>الصيدليات</h2>
      <div className={styles.description}>
        <p>امكانية التعرف والوصول الى أكثر من 12 ألف منتج.</p>
        <p>
          البحث والتسوق والطلب بسلاسة وسهولة على مدار 24 ساعة وخلال أيام
          الأسبوع..
        </p>
        <p>خيارات بحث متعددة لتسهيل إمكانية الوصول لاحتياجك.</p>
        <p>مراقبة حالة الطلبات من المستودعات.</p>
        <p className={styles.full_width}>
          التعرف على المنتجات الجديدة وتحديثات الاسعار إضافة الى اهم الاخبار.
        </p>
      </div>
    </div>
  );
}

export default PharmacyIntroduce;
