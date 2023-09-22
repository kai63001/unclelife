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
import ManageSubscrptionComponent from "@/app/(dashboard)/setting/components/ManageSubscrption";
import DeleteAccount from "@/app/(dashboard)/setting/components/DeleteAccount";
import WorkspaceSetting from "@/app/(dashboard)/setting/components/Workspace";

export const metadata = {
    title: "Uncle Life Dashboard - Manage Your Notion Tools",
    description: "Navigate to Uncle Life's settings to personalize your account and fine-tune your Notion tools preferences. Gain control, enhance security, and tailor your experience to fit your unique needs.",
};

const SettingPage = () => {

    return (
        <div>
            <h1 className={'text-4xl font-bold'}>Settings</h1>
            <Tabs defaultValue="account" className="w-full mt-10">
                <TabsList className="grid grid-cols-3 w-[800px]">
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
                                <br/>
                                Soon...
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className={''}>
                                <b>Danger Zone</b>
                                <br/>
                                <br/>
                                <DeleteAccount/>
                                <p className={'text-sm'}>
                                    Once you delete your account, there is no going back. Please be
                                    certain.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="subscription">
                    <Card>
                        {}
                        <CardHeader>
                            <CardTitle>Manage Subscription</CardTitle>
                            <CardDescription>
                                Subscription management: control, customize, pay, cancel.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ManageSubscrptionComponent/>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="workspaces">
                    <Card>
                        {}
                        <CardHeader>
                            <CardTitle>Workspaces</CardTitle>
                            <CardDescription>
                                Manage your workspaces here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <WorkspaceSetting/>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SettingPage;
