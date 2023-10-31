"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

const VideoIndex = () => {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.video
        animate={{ opacity: 1 }}
        src="https://cdn.unclelife.co/1031.mp4"
        className="rounded-t-3xl overflow-hidden"
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline={true}
      ></m.video>
    </LazyMotion>
  );
};

export default VideoIndex;
