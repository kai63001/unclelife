import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


const SettingPage = () => {
    return (
        <div>
            <h1 className={'text-4xl font-bold'}>Settings</h1>
            <Tabs defaultValue="account" className="w-full mt-10">
                <TabsList className="grid grid-cols-2 w-[400px]">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Subscription</TabsTrigger>
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
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <Input id="current" type="password"/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password"/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SettingPage;
