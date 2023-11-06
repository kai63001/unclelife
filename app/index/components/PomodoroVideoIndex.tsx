"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

const PomodoroVideoIndex = () => {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.video
        animate={{ opacity: 1 }}
        src="https://cdn.unclelife.co/pomodoroWidget.mp4"
        className="rounded-3xl overflow-hidden"
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline={true}
      ></m.video>
    </LazyMotion>
  );
};

export default PomodoroVideoIndex;
