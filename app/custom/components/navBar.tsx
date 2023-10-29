import Link from "next/link";
import { getSession } from "@/app/hook/supabase-server";
import ButtonMapInput from "./button/ButtonMapInput";
import OpenFormBtn from "./button/openForm";
import ButtonEmbed from "@/app/custom/components/button/ButtonEmbed";
import ControllerButtonSave from "./button/ControllerButtonSave";
import ButtonCondition from "./button/ButtonCondition";
import ButtonNotification from "./button/ButtonNotification";
import { FormVisibilitySelection } from "./button/FormVisibilitySelection";
import { BrowserView, MobileView } from "react-device-detect";

const CustomFormNavbar = async () => {
  const [session] = await Promise.all([getSession()]);

  return (
    <div className="mt-5 pl-5 pr-5 flex w-full justify-between flex-row items-center fixed z-50 whitespace-nowrap overflow-y-auto">
      <div className="flex space-x-3 items-center">
        <Link
          href={"/form/create"}
          className="bg-background px-5 py-2 rounded-md shadow-me"
        >
          <h1 className="font-bold text-2xl">Uncle Life</h1>
        </Link>
        <OpenFormBtn />
        <ButtonEmbed />
        <ButtonCondition />
        <ButtonNotification />
      </div>
      <div className="flex space-x-3 md:mt-0 ml-10">
        <FormVisibilitySelection />
        <ButtonMapInput />
        <ControllerButtonSave session={session} />
      </div>
    </div>
  );
};

export default CustomFormNavbar;
