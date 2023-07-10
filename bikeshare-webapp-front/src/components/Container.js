import SkeletonTheme from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

function Container({ children }, props) {
  return (
    <div
      className={`items-center bg-slate-100 rounded-3xl p-[50px] flex flex-col space-y-10 justify-center shadow-md min-h-[300px] min-w-[600px] m-10`}
    >
      {children}
    </div>
  );
}

export default Container;
