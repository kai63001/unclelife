"use client";
import Link from "next/link";
import {Home, PlusSquare, FormInput, MessageSquare, Feather, Timer, Globe2} from "lucide-react";
import {usePathname} from "next/navigation";
import {useState} from "react";

const ListSideBar = () => {
    const pathname = usePathname();
    const [pathList] = useState<({
        items: ({
            path: string;
            name: string;
            blank?: boolean;
            icon: JSX.Element
        })[];
        group: string
    })[]>([
        {
            group: "DASHBOARD",
            items: [
                {
                    path: "/home",
                    name: "Home",
                    icon: <Home className="mr-1 h-5"/>,
                },
            ]
        },
        {
            group: "FORMS",
            items: [
                {
                    path: "/form/my",
                    name: "My Form",
                    icon: <FormInput className="mr-1 h-5"/>,
                },
                {
                    path: "/form/create",
                    name: "Create a form",
                    icon: <PlusSquare className="mr-1 h-5"/>,
                },
                {
                    path: "/form/custom-domain",
                    name: "Custom Domain",
                    icon: <Globe2 className="mr-1 h-5"/>,
                }
            ],
        },
        {
          group: "WIDGETS",
          items: [
            {
              path: "/widget/pomodoro",
              name: "Pomodoro",
              icon: <Timer className="mr-1 h-5" />,
            },
          ],
        },
        {
            group: "HELP",
            items: [
                {
                    path: "https://uncle-life.canny.io/feedback",
                    blank: true,
                    name: "Feedback",
                    icon: <MessageSquare className="mr-1 h-5"/>,
                },
                {
                    path: "https://uncle-life.canny.io/feature-requests",
                    blank: true,
                    name: "Feature Request",
                    icon: <Feather className="mr-1 h-5"/>,
                }
            ]
        }
    ]);
    return (
        <div className="flex-grow p-4 h-96 xl:h-full overflow-hidden">
            {pathList.map((group) => (
                <div key={group.group} className="mb-5">
                    <span className="font-bold text-xs text-primary">{group.group}</span>
                    <ul className="space-y-2 mt-2">
                        {group.items.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={`${
                                        pathname === item.path
                                            ? "bg-primary text-secondary"
                                            : "hover:bg-primary hover:text-secondary text-primary duration-300"
                                    } rounded-sm py-2 flex items-center space-x-2 px-3`}
                                    target={item.blank ? "_blank" : undefined}
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
