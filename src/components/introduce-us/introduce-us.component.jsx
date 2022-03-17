import React from "react";

import styles from "./introduce-us.module.scss";

function IntroduceUs() {
  return (
    <div className={styles.container}>
      <h2>من نحن</h2>
      <hr
        style={{
          width: "50%",
          marginInline: "auto",
          marginBlock: "10px",
        }}
      />
      <p>
        سمارت فارما هو اول موقع ويب وتطبيق الكتروني مختص في التسويق والمبيعات
        الصيدلانية، نعتمد على الربط بين الصيدليات واحتياجاتهم من الشركات
        والمستودعات ونفتح عالمًا من الإمكانات من المنتجات الدوائية والمستلزمات
        الطبية والتجميلية والمتممات الغذائية ومنتجات العناية بالطفل.... والوصول
        إلى كل ما تحتاجه وتريده لصيدليتك.
      </p>
    </div>
  );
}

export default IntroduceUs;
