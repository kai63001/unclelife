import Link from "next/link";
import ButtonSaveCustomForm from "./button/ButtonSave";
import { getSession } from "@/app/hook/supabase-server";
import ButtonMapInput from "./button/ButtonMapInput";

const CustomFormNavbar = async () => {
  const [session] = await Promise.all([getSession()]);

  return (
    <div className="mt-5 pl-5 pr-5 flex w-full justify-between items-center fixed z-50">
      <div className="flex space-x-3 items-center">
        <Link href="/" className="bg-background px-5 py-2 rounded-md shadow-me">
          <h1 className="font-bold text-2xl">Uncle Life</h1>
        </Link>
        <div className="bg-background px-5 py-3 rounded-md shadow-me font-medium">
          Custom Form
        </div>
      </div>
      <div className="flex space-x-3">
        <ButtonMapInput />
        <ButtonSaveCustomForm session={session} />
      </div>
    </div>
  );
};

export default CustomFormNavbar;
