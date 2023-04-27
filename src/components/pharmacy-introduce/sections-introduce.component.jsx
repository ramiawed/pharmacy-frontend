import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import styles from "./sections-introduce.module.scss";
import { Colors } from "../../utils/constants";

function SectionsIntroduce() {
  return (
    <div className={styles.container}>
      <VerticalTimeline lineColor={Colors.LIGHT_GREY_COLOR} layout="1-column">
        <VerticalTimelineElement
          position="right"
          className="vertical-timeline-element--work"
          contentStyle={{
            background: "#6D597A",
            color: "#fff",
          }}
          contentArrowStyle={{ borderRight: "7px solid  #6D597A" }}
          iconStyle={{ background: "#6D597A", color: "#fff" }}
        >
          <h3 className={`${styles.header} vertical-timeline-element-title`}>
            الصيدليات
          </h3>
          <ul className={styles.ul}>
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
        </VerticalTimelineElement>
        <VerticalTimelineElement
          position="left"
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#915F78", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  #915F78" }}
          iconStyle={{ background: "#915F78", color: "#fff" }}
          // icon={<WorkIcon />}
        >
          <h3 className={`${styles.header} vertical-timeline-element-title`}>
            المستودعات
          </h3>
          <ul className={styles.ul}>
            <li>مراقبة ومتابعة الطلبات القادمة من الصيدليات</li>
            <li>إضافة عروض او حسومات على المنتجات المتوفرة لديك.</li>
            <li>
              التحكم الكامل بإضافة منتجات الشركات المتوفرة لديك الى قائمتك او
              حذفها.
            </li>
          </ul>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          position="right"
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#B56576", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  #B56576" }}
          iconStyle={{ background: "#B56576", color: "#fff" }}
          // icon={<WorkIcon />}
        >
          <h3 className={`${styles.header} vertical-timeline-element-title`}>
            الضيوف
          </h3>
          <ul className={styles.ul}>
            <li>التعرف على منتجات الشركات وتركيباتها واستطباباتها</li>
            <li>معرفة أسعار العموم</li>
            <li>
              التعرف على المنتجات الجديدة المطروحة بالسوق اضافة الى اهم الاخبار
            </li>
          </ul>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
}

export default SectionsIntroduce;
