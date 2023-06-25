"use client";
import NextNProgress from "nextjs-progressbar";

const NextNProgressbar = () => {
  return (
    <NextNProgress
      color="#29D"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
    />
  );
};

export default NextNProgressbar;
