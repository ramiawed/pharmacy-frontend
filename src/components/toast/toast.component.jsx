import { useEffect } from "react";

// style
import "./toast.style.scss";

function Toast({ bgColor, foreColor, toastText, actionAfterTimeout }) {
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
      <div className="toast">{toastText}</div>
    </div>
  );
}

export default Toast;
