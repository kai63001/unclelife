"use client";
import ProgressBar from "next-nprogress-bar";

const NextNProgressbar = () => {
  return (
    <ProgressBar
      height="4px"
      color="#e52b50"
      options={{ showSpinner: false }}
      shallowRouting
      appDirectory
    />
  );
};

export default NextNProgressbar;
