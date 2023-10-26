"use client";
import ProgressBar from "next-nprogress-bar";

const NextNProgressbar = () => {
  return (
    <ProgressBar
      height="0px"
      color="#e52b50"
      options={{ showSpinner: true }}
      shallowRouting
      appDirectory
    />
  );
};

export default NextNProgressbar;
