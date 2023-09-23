import Link from "next/link";
import { getSession } from "@/app/hook/supabase-server";
import ButtonMapInput from "./button/ButtonMapInput";
import OpenFormBtn from "./button/openForm";
import ButtonEmbed from "@/app/custom/components/button/ButtonEmbed";
import ControllerButtonSave from "./button/ControllerButtonSave";

const CustomFormNavbar = async () => {
  const [session] = await Promise.all([getSession()]);

  return (
    <div className="mt-5 pl-5 pr-5 flex w-full justify-between items-center fixed z-50">
      <div className="flex space-x-3 items-center">
        <Link
          href={"/form/create"}
          className="bg-background px-5 py-2 rounded-md shadow-me"
        >
          <h1 className="font-bold text-2xl">Uncle Life</h1>
        </Link>
        <OpenFormBtn />
        <ButtonEmbed />
      </div>
      <div className="flex space-x-3">
        <ButtonMapInput />
        <ControllerButtonSave session={session} />
      </div>
    </div>
  );
};

export default CustomFormNavbar;
