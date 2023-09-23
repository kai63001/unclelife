import dynamic from "next/dynamic";
import TabListSetting from "./components/TabList";

export const metadata = {
  title: "Uncle Life Dashboard - Manage Your Notion Tools",
  description:
    "Navigate to Uncle Life's settings to personalize your account and fine-tune your Notion tools preferences. Gain control, enhance security, and tailor your experience to fit your unique needs.",
};

const SettingPage = () => {
  return (
    <div>
      <h1 className={"text-4xl font-bold"}>Settings</h1>
      <TabListSetting />
    </div>
  );
};

export default SettingPage;
