import React, { useEffect } from "react";

// style
import "./toast.style.scss";

function Toast({
  bgColor,
  foreColor,
  toastText,
  actionAfterTimeout,
  children,
}) {
  useEffect(() => {
    setTimeout(() => {
      actionAfterTimeout();
    }, 3000);
  });

  return (
    <div
      className="toast-container"
      style={{
        background: bgColor,
        color: foreColor,
      }}
    >
      <div>{toastText}</div>
      {children}
    </div>
  );
}

export default Toast;
