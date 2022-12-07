import React from "react";

const LoadingSM = ({ size }) => {
  return (
    <div className="flex items-center justify-center ">
      <img
        src="/loading.gif"
        alt="Loading..."
        loading="lazy"
        className={`h-${size}`}
      />
    </div>
  );
};

export default LoadingSM;

/**
 * Size would be:
 * size={"32"} => 08
 * size={"64"} => 16
 * size={"96"} => 24
 */
