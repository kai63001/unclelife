import Link from "next/link";
import { Home } from "lucide-react";

const Slidebars = () => {
  return (
    <div className="text-black h-screen w-64 flex flex-col border-r">
      <div className="p-4">
        <Link href="/home">
          <h1 className="text-2xl font-bold">UncleLife</h1>
        </Link>
      </div>
      <div className="flex-grow p-4">
        <span className="font-bold text-xs">FORMS</span>
        <ul className="space-y-2 mt-2">
          <li>
            <Link
              href="/home"
              className="bg-primary text-white rounded-sm px-3 py-2 flex items-center space-x-2"
            >
              <Home className="mr-1 h-5" />
              Home
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Slidebars;
