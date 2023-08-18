import Link from "next/link";

import ProfileBar from "./ProfileBar";
import ListSideBar from "./ListSidebar";
import UpgradePlan from "@/app/(dashboard)/components/UpgradePlan";

const Slidebars = async () => {
    //get auth data

    return (
        <div className="text-black h-screen w-64 flex flex-col border-r">
            <div className="p-4">
                <Link href="/">
                    <p className="text-2xl font-bold text-primary">UncleLife
                        <span className={'text-xs ml-2'}>BETA</span>
                    </p>
                </Link>
            </div>
            <ListSideBar/>
            <div className="p-4">
                <UpgradePlan/>
                <ProfileBar/>
            </div>
        </div>
    );
};

export default Slidebars;
