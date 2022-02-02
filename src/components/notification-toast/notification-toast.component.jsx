import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../../utils/constants";

// style
import styles from "./notification-toast.module.scss";

function NotificationToast({ bgColor, actionAfterTimeout, data, close }) {
  const history = useHistory();
  // const timer = useRef(null);
  useEffect(() => {
    let timer = setTimeout(() => {
      actionAfterTimeout();
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div
      className={styles.toast_container}
      style={{
        backgroundColor: bgColor,
      }}
      onClick={() => {
        history.push(`/notification/${data._id}`);
        close();
      }}
    >
      {data.logo_url.length > 0 && (
        <div>
          <img
            src={`${SERVER_URL}/${data.logo_url}`}
            className={styles.logo}
            alt="thumb"
          />
        </div>
      )}

      <div style={{ flex: 1 }}>
        {/* <div className="toast">{toastText}</div> */}
        <p className={styles.header}>{data.header}</p>
        <p
          className={styles.description}
          style={{
            maxWidth: data.logo_url.length > 0 ? "215px" : "270px",
          }}
        >
          {data.body}
        </p>
      </div>
    </div>
  );
}

export default NotificationToast;
