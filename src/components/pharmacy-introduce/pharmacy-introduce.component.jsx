import React from "react";
import PharmacyImage from "../../pharmacy01.png";
import styles from "./pharmacy-introduce.module.scss";

function PharmacyIntroduce() {
  return (
    <div className={styles.container}>
      <img
        src={PharmacyImage}
        style={{
          width: "250px",
          height: "250px",
          marginBlockEnd: "10px",
        }}
        alt="thumb"
      />
      <div className={styles.description}>
        <p>امكانية التعرف والوصول الى أكثر من 12 ألف منتج.</p>
        <p>
          البحث والتسوق والطلب بسلاسة وسهولة على مدار 24 ساعة وخلال أيام
          الأسبوع..
        </p>
        <p>خيارات بحث متعددة لتسهيل إمكانية الوصول لاحتياجك.</p>
        <p>مراقبة حالة الطلبات من المستودعات.</p>
        <p>
          التعرف على المنتجات الجديدة وتحديثات الاسعار إضافة الى اهم الاخبار.
        </p>
      </div>
    </div>
  );
}

export default PharmacyIntroduce;
