import React from "react";
import { SERVER_URL } from "../../utils/constants";
import DefaultLogo from "../../logo.png";

// styles
import styles from "./partners-home-page.module.scss";

function PartnerHomePage({ data, header, description, type }) {
  return (
    <div className={styles.container}>
      <h2>{header}</h2>
      <p>{description}</p>
      <div className={styles.details}>
        {data.map((d) => (
          <div
            key={d._id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className={styles.logo_div}>
              <img
                src={
                  d.logo_url.length > 0
                    ? `${SERVER_URL}profiles/${d.logo_url}`
                    : `${DefaultLogo}`
                }
                alt="thumb"
              />
            </div>
            <h4>{d.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PartnerHomePage;
