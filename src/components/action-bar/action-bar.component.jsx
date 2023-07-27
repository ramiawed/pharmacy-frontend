import React from "react";

const ActionBar = ({ children }) => {
  return (
    <div className="flex justify-center flex-wrap mb-[10px] gap-[6px] px-0 py-[6px]">
      {children}
    </div>
  );
};

export default ActionBar;
