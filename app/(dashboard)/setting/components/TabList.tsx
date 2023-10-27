"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ManageSubscrptionComponent = dynamic(
    () => import("@/app/(dashboard)/setting/components/ManageSubscrption"),
    { ssr: false }
);
const DeleteAccount = dynamic(
    () => import("@/app/(dashboard)/setting/components/DeleteAccount"),
    { ssr: false }
);
const WorkspaceSetting = dynamic(
    () => import("@/app/(dashboard)/setting/components/Workspace"),
    { ssr: false }
);

const TabListSetting = () => {
  const searchParams = useSearchParams();
  const [tab,setTab] = useState(searchParams.get("tab") || "account")
  // console.log("tab", searchParams.get("tab"));

  useEffect(() => {
    setTab(searchParams.get("tab") || "account")
  }, [searchParams])


  return (
    <Tabs defaultValue={tab} className="w-full mt-10">
      <TabsList className="grid grid-cols-1 md:grid-cols-3 w-[800px]">
        <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="subscription">Subscription</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here.
              <br />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className={""}>
              <b>Danger Zone</b>
              <br />
              <br />
              <DeleteAccount />
              <p className={"text-sm"}>
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="subscription">
        <Card>
          <CardHeader>
            <CardTitle>Manage Subscription</CardTitle>
            <CardDescription>
              Subscription management: control, customize, pay, cancel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ManageSubscrptionComponent />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="workspaces">
        <Card>
          <CardHeader>
            <CardTitle>Workspaces</CardTitle>
            <CardDescription>Manage your workspaces here.</CardDescription>
          </CardHeader>
          <CardContent>
            <WorkspaceSetting />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabListSetting;
