import React from "react";

const LoadingXL = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white opacity-75 flex flex-col items-center justify-center">
      <img src="/loading.gif" alt="Loading..." loading="lazy" />
    </div>
  );
};

export default LoadingXL;
