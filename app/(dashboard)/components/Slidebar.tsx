import Link from "next/link";

import ProfileBar from "./ProfileBar";
import ListSideBar from "./ListSidebar";

const Slidebars = async () => {
  //get auth data

  
  return (
    <div className="text-black h-screen w-64 flex flex-col border-r">
      <div className="p-4">
        <Link href="/home">
          <p className="text-2xl font-bold">UncleLife</p>
        </Link>
      </div>
      <ListSideBar />
      <div className="p-4">
        <ProfileBar />
      </div>
    </div>
  );
};

export default Slidebars;
