import React from "react";
import AdvertisementItem from "../advertisement-item/advertisement-item.component";
import AdvertisementPartner from "../advertisement-partner/advertisement-partner.component";

import styles from "./section-home-page-flex.module.scss";

function SectionHomePageFlex({
  data,
  containerBackground,
  headerBackground,
  header,
  description,
  type,
  order,
}) {
  return (
    <div
      className={styles.container}
      style={{
        order: order,
        background: headerBackground,
      }}
    >
      <div
        className={styles.header}
        style={{
          background: headerBackground,
        }}
      >
        <h2>{header}</h2>
        <p>{description}</p>
      </div>

      <div className={styles.advertisement_container} style={{}}>
        {data?.map((d) => (
          <div className={styles.inner_container} key={d._id}>
            {type === "item" ? (
              <AdvertisementItem item={d} contentColor={containerBackground} />
            ) : (
              <AdvertisementPartner
                user={d}
                contentColor={containerBackground}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionHomePageFlex;
