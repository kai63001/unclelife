"use client";
import Link from "next/link";
import { Home, PlusSquare, Timer, Clock } from "lucide-react";
import { usePathname } from "next/navigation";
const ListSideBar = () => {
  const pathname = usePathname();
  const pathList = [
    {
      group: "FORMS",
      items: [
        {
          path: "/home",
          name: "Home",
          icon: <Home className="mr-1 h-5" />,
        },
        {
          path: "/form/create",
          name: "Create a form",
          icon: <PlusSquare className="mr-1 h-5" />,
        },
      ],
    },
    // {
    //   group: "WIDGETS",
    //   items: [
    //     {
    //       path: "/pomodoro",
    //       name: "Pomodoro",
    //       icon: <Timer className="mr-1 h-5" />,
    //     },
    //     {
    //       path: "/clock",
    //       name: "Clock",
    //       icon: <Clock className="mr-1 h-5" />,
    //     },
    //   ],
    // },
  ];
  return (
    <div className="flex-grow p-4">
      {pathList.map((group) => (
        <div key={group.group} className="mb-5">
          <span className="font-bold text-xs">{group.group}</span>
          <ul className="space-y-2 mt-2">
            {group.items.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`${
                    pathname === item.path
                      ? "bg-primary text-white"
                      : "hover:bg-primary hover:text-white duration-300"
                  } rounded-sm py-2 flex items-center space-x-2 px-3`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListSideBar;
