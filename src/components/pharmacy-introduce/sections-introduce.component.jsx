import React from "react";

import styles from "./sections-introduce.module.scss";

function SectionsIntroduce() {
  return (
    <div className={styles.outer_container}>
      <div className={styles.container}>
        <div className={styles.header_container}>
          <h2>الصيدليات</h2>
        </div>
        <div className={styles.content_container}>
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
      </div>

      <div className={styles.container}>
        <div className={styles.header_container}>
          <h2>المستودعات</h2>
        </div>
        <div className={styles.content_container}>
          <ul>
            <li>مراقبة ومتابعة الطلبات القادمة من الصيدليات</li>
            <li>إضافة عروض او حسومات على المنتجات المتوفرة لديك.</li>
            <li>
              التحكم الكامل بإضافة منتجات الشركات المتوفرة لديك الى قائمتك او
              حذفها.
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.header_container}>
          {/* <IoIosPeople /> */}
          <h2>الضيوف</h2>
        </div>
        <div className={styles.content_container}>
          <ul>
            <li>التعرف على منتجات الشركات وتركيباتها واستطباباتها</li>
            <li>معرفة أسعار العموم</li>
            <li>
              التعرف على المنتجات الجديدة المطروحة بالسوق اضافة الى اهم الاخبار
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SectionsIntroduce;
