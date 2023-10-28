"use client";
import { TextCursorInput, AlarmClock, Music, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
const TEXTS = ["Form", "Survey", "Feedback", "Response"];

const FeatureIndex = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className="mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/*form*/}
        <Link
          href={"/form/create"}
          className={
            "border shadow-md rounded-md overflow-hidden cursor-pointer group relative"
          }
        >
          <div
            className={
              "h-44 bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center"
            }
          >
            <TextCursorInput size={64} className={"text-white"} />
          </div>
          <div className="absolute top-0 group-hover:block hidden">
            <div className="space-y-2">
             <div className="bg-red-400 text-white text-xs font-bold py-1 px-2 rounded-full ml-2 mt-2">
                Infinite Responses
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold flex">
              <TextTransition springConfig={presets.wobbly} className="mr-1.5">
                {TEXTS[index % TEXTS.length]}
              </TextTransition>
              Builder
            </h3>
            <ul className="text-muted-foreground text-sm">
              <li>Customizable fields</li>
              <li>Integration with Notion databases</li>
            </ul>
          </div>
        </Link>
        <Link
          href={"/widget/pomodoro"}
          className={
            "border shadow-md rounded-md overflow-hidden cursor-pointer group"
          }
        >
          <div
            className={
              "h-44 bg-gradient-to-r from-rose-400 to-red-500 flex justify-center items-center group-hover:hidden duration-150"
            }
          >
            <AlarmClock size={64} className={"text-white"} />
          </div>
          <div
            className={
              "h-44 bg-gradient-to-r from-rose-400 to-blue-500 hidden justify-center items-center group-hover:flex duration-150"
            }
          >
            <video
              width="100%"
              height=" 176px"
              className={"h-44 w-full object-cover extraClassCrop1"}
              autoPlay
              muted
              playsInline
              preload={"auto"}
              loop
              controls={false}
            >
              <source src="/pomodoro/pomodoroWidget.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold flex items-center">
              Pomodoro
              {/*<span*/}
              {/*    className={'rounded-full px-3 bg-red-600 text-white text-xs font-bold py-1 ml-2'}>SOON</span>*/}
            </h3>
            <ul className="text-muted-foreground text-sm">
              <li>Set work and break intervals</li>
              <li>Audio and visual alerts</li>
            </ul>
          </div>
        </Link>
        <div className="border shadow-md rounded-md overflow-hidden cursor-pointer">
          <div className="h-44 bg-gradient-to-r from-lime-300 to-lime-500 flex justify-center items-center">
            <CheckCircle size={64} className="text-white" />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold">
              Habit Tracker{" "}
              <span
                className={
                  "rounded-full px-3 bg-red-600 text-white text-xs font-bold py-1 ml-2"
                }
              >
                SOON
              </span>
            </h3>
            <ul className="text-muted-foreground text-sm">
              <li>Track your daily habits</li>
              <li>Set reminders and notifications</li>
            </ul>
          </div>
        </div>
        {/* <div className={'border shadow-md rounded-md overflow-hidden cursor-pointer'}>
                    <div className={'h-44 bg-gradient-to-r from-lime-400 to-lime-500 flex justify-center items-center'}>
                        <Music size={64} className={'text-white'}/>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold flex items-center">Ambient Sound
                            <span
                                className={'rounded-full px-3 bg-red-600 text-white text-xs font-bold py-1 ml-2'}>SOON</span>
                        </h3>
                        <ul className="text-muted-foreground text-sm">
                            <li>
                                Designed to enhance the user experience by providing a range of calming and immersive background sounds.
                            </li>
                        </ul>
                    </div>
                </div> */}
      </div>
    </div>
  );
};

export default FeatureIndex;
