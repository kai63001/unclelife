import Slidebars from "./components/Slidebar";
import React from "react";
import CrispChat from "@/components/Crisp";

//layout
export const metadata = {
    title: "Uncle Life Dashboard - Manage Your Notion Tools",
    description: "Welcome to the Uncle Life Dashboard, your central hub for managing and optimizing Notion forms and widgets. Experience streamlined control, monitor your tools, and make the most of your Notion integration",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex justify-center">
            <Slidebars/>
            <CrispChat/>
            <div className="p-4 w-full max-w-6xl mx-auto mt-14 ">{children}</div>
        </div>
    );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
