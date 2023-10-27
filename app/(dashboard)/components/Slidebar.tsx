import Link from "next/link";

import ProfileBar from "./ProfileBar";
import ListSideBar from "./ListSidebar";
import UpgradePlan from "@/app/(dashboard)/components/UpgradePlan";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Slidebars = async () => {
  //get auth data

  return (
    <>
      <div className="text-black h-screen w-[300px] hidden xl:flex">
        <div className="fixed flex flex-col justify-between border-r bg-background z-50 left-0 h-screen w-64">
          <div>
            <div className="p-4">
              <Link href="/">
                <p className="text-2xl font-bold text-primary">
                  UncleLife
                  <span className={"text-xs ml-2"}>BETA</span>
                </p>
              </Link>
            </div>
            <ListSideBar />
          </div>
          <div className="p-4">
            <UpgradePlan />
            <ProfileBar />
          </div>
        </div>
      </div>
      <div className="flex xl:hidden p-4 justify-between items-center w-full fixed bg-white z-50">
        <div></div>
        <Link href="/">
          <p className="text-2xl font-bold text-primary">
            UncleLife
            <span className={"text-xs ml-2"}>BETA</span>
          </p>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <Menu className={"w-6 h-6"} />
            </Button>
          </SheetTrigger>
          <SheetContent side={"right"} className="w-64 px-0">
            <div className="flex flex-col justify-between bg-background z-50 left-0 h-screen">
              <div>
                <div className="p-4">
                  <Link href="/">
                    <p className="text-2xl font-bold text-primary">
                      UncleLife
                      <span className={"text-xs ml-2"}>BETA</span>
                    </p>
                  </Link>
                </div>
                <ListSideBar />
              </div>
              <div className="p-4 mb-5">
                <UpgradePlan />
                <ProfileBar />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Slidebars;
