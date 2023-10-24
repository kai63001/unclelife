import RenderMyFormLoading from "@/app/(dashboard)/form/my/RenderMyFormLoading";
const dynamic = require("next/dynamic");
// import RenderMyForm from "@/app/(dashboard)/form/my/RenderMyForm";
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
import Link from "next/link"
const RenderMyForm = dynamic(
    () => import("@/app/(dashboard)/form/my/RenderMyForm"),
    {ssr: false}
);


const DashboardPage = () => {
    return (
        <div>
            <div className={'mb-4'}>
                <h2 className={'text-2xl font-bold mb-3'}>Featured</h2>
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Create Form</CardTitle>
                            <CardDescription>Start building your custom Notion form with just a few
                                clicks.
                                <br/>
                                <br/>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <iframe width="100%" height="240"
                                    src="https://www.youtube.com/embed/EoQROpU_m20?si=fLSG8zTVBlN1_hpN"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen></iframe>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant={"outline"}>Help</Button>
                            <Link href={"/form/create"}>
                                <Button>Create</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>
                                Pomodoro Widget
                            </CardTitle>
                            <CardDescription className={''}>
                                Time management method developed by Francesco Cirillo in the late 1980s.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <video width="100%" height="240"
                                   className={'h-[240px] w-full object-cover'}
                                   autoPlay
                                   muted
                                   playsInline
                                   preload={'auto'}
                                   loop
                                   controls={false}
                            >
                                <source src="/pomodoro/pomodoroWidget.mp4" type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant={"outline"}>Help</Button>
                            <Link href={"/form/create"}>
                                <Button>Create</Button>
                            </Link>
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
