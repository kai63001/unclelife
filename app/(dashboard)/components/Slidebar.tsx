import Link from "next/link";

import ProfileBar from "./ProfileBar";
import ListSideBar from "./ListSidebar";
import UpgradePlan from "@/app/(dashboard)/components/UpgradePlan";

const Slidebars = async () => {
  //get auth data

  return (
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
  );
};

export default Slidebars;
