import { Button } from "@/components/ui/button";
import Link from "next/link";

const CustomFormNavbar = () => {
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
      <Button className="h-full px-10 py-3 font-medium">SAVE</Button>
    </div>
  );
};

export default CustomFormNavbar;
