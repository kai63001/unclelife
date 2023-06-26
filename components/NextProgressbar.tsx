"use client";
import ProgressBar from "next-nprogress-bar";

const NextNProgressbar = () => {
  return (
    <ProgressBar
      height="4px"
      color="#000000"
      options={{ showSpinner: false }}
      shallowRouting
      appDirectory
    />
  );
};

export default NextNProgressbar;
