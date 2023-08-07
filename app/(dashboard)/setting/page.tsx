import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import {useAppSelector} from "@/app/redux/hook";


const SettingPage = () => {

    return (
        <div>
            <h1 className={'text-4xl font-bold'}>Settings</h1>
            <Tabs defaultValue="account" className="w-full mt-10">
                <TabsList className="grid grid-cols-2 w-[400px]">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="subscription">Subscription</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className={''}>
                                <b>Danger Zone</b>
                                <br/>
                                <br/>
                                <Button variant={'destructive'}>Delete account</Button>
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
            </Tabs>
        </div>
    );
};

export default SettingPage;
