"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion } from "@/components/ui/accordion";
import CustomTimerPomodoroToolBar from "@/app/(dashboard)/widget/pomodoro/components/Toolbar/CustomTimer";
import CustomizationPomodoroToolbar from "@/app/(dashboard)/widget/pomodoro/components/Toolbar/Customization";
import PomodoroCustomToolBar from "@/app/(dashboard)/widget/pomodoro/components/Toolbar/PomodoroCustom";
import BackgroundPomodoroToolBar from "@/app/(dashboard)/widget/pomodoro/components/Toolbar/BackgroundPomodoro";
import { useAppDispatch } from "@/app/redux/hook";
import { useEffect } from "react";
import {
  setAllCustomization,
  setAllPomodoro,
  setCustomTimer,
  setIdPomodoro,
  setKeyPomodoro,
} from "@/app/redux/slice/pomodoroController.slice";
import { useSupabase } from "@/app/hook/supabase-provider";
import CustomSoundToolbar from "@/app/(dashboard)/widget/pomodoro/components/Toolbar/CustomSound";

const PomodoroToolbar = () => {
  const { supabase } = useSupabase();
  const dispatch = useAppDispatch();
  const { user } = useSupabase();
  // const {customTimer, key, id, customization, pomodoro} = useAppSelector(state => state.pomodoroReducer)

  useEffect(() => {
    //get data from supabase
    if (!user?.id) return;
    const fetchPomodoro = async () => {
      const { data, error } = await supabase
        .from("pomodoro")
        .select("id,data")
        .eq("user_id", user?.id)
        .limit(1)
        .order("created_at", { ascending: false })
        .single();
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        dispatch(setCustomTimer(data.data.customTimer));
        dispatch(setKeyPomodoro(data.data.key));
        dispatch(setIdPomodoro(data.id));
        dispatch(setAllPomodoro(data.data.pomodoro));
        dispatch(setAllCustomization(data.data.customization));
      }
    };
    fetchPomodoro().then((r) => r);
  }, [dispatch, supabase, user]);

  return (
    <div
      className={
        "fixed right-0 top-0 h-screen w-96 flex flex-col border-l bg-background pl-5 z-50"
      }
    >
      <ScrollArea className={"pr-5"}>
        <h2 className={"my-5 font-bold text-xl text-muted-foreground"}>
          SETTINGS
        </h2>
        <Accordion
          type="multiple"
          defaultValue={["customTimer", "pomodoroCustom"]}
        >
          <CustomTimerPomodoroToolBar />
          <PomodoroCustomToolBar />
          <BackgroundPomodoroToolBar />
          <CustomizationPomodoroToolbar />
          <CustomSoundToolbar />
        </Accordion>
      </ScrollArea>
    </div>
  );
};

export default PomodoroToolbar;
