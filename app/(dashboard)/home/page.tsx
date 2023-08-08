import RenderMyFormLoading from "@/app/(dashboard)/form/my/RenderMyFormLoading";
import RenderMyForm from "@/app/(dashboard)/form/my/RenderMyForm";
import {Suspense} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Button
} from "@/components/ui/button";

const DashboardPage = () => {
    return (
        <div>
            <div className={'mb-4'}>
                <h2 className={'text-2xl font-bold mb-3'}>All Widget</h2>
                <div className={'grid grid-cols-4 gap-4'}>
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Create Form</CardTitle>
                            <CardDescription>Start building your custom Notion form with just a few clicks.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            asd
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Deploy</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <Suspense fallback={<RenderMyFormLoading/>}>
                <RenderMyForm limit={4}/>
            </Suspense>
        </div>
    );
};

export default DashboardPage;
