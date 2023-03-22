import React from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/small_logo.png";

// styles
import styles from "./introduce-us.module.scss";

function IntroduceUs() {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.content_container}>
        <h2>
          {t("app name in arabic")}
          <img className={styles.img} src={Logo} alt="smart logo" />
        </h2>
        <p>
          اول موقع ويب وتطبيق الكتروني مختص في التسويق والمبيعات الصيدلانية،
          نعتمد على الربط بين الصيدليات واحتياجاتهم من الشركات والمستودعات ونفتح
          عالمًا من الإمكانات من المنتجات الدوائية والمستلزمات الطبية والتجميلية
          والمتممات الغذائية ومنتجات العناية بالطفل.... والوصول إلى كل ما تحتاجه
          وتريده لصيدليتك.
        </p>
      </div>
    </div>
  );
}

export default IntroduceUs;
