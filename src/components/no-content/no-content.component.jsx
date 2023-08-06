import React from "react";
import NoContentImage from "../../assets/no-content.png";

// constants
import { useTheme } from "../../contexts/themeContext";

function NoContent({ msg }) {
  const { theme } = useTheme();
  return (
    <div className="w-1/2 h-[200px] my-[50px] mx-auto rounded-md flex justify-center items-center flex-col">
      <img
        src={NoContentImage}
        alt="thumb"
        style={{
          width: "150px",
          height: "150px",
        }}
      />

      <p
        className={`bold text-center text-lg ${
          theme === "light" ? "text-dark" : "text-color-primary-500"
        }`}
      >
        {msg}
      </p>
    </div>
  );
}

export default NoContent;
