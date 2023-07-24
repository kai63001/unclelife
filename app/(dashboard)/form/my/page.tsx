import {Suspense} from "react";
import RenderMyForm from "@/app/(dashboard)/form/my/RenderMyForm";
import RenderMyFormLoading from "@/app/(dashboard)/form/my/RenderMyFormLoading";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const MyFormPage = () => {
    return (
        <div>
            <div className={`mb-3 flex justify-between items-center`}>
                <div>
                    <h1 className={`text-2xl font-bold mb-1 uppercase`}>
                        My Form
                    </h1>
                    <p className={`text-muted-foreground`}>
                        My form is a list of forms that you have created.
                    </p>
                </div>
                <Button asChild>
                    <Link href={"/form/create"}>
                        Create a form
                    </Link>
                </Button>
            </div>
            <Suspense fallback={<RenderMyFormLoading/>}>
                <RenderMyForm/>
            </Suspense>
        </div>
    )
}

export default MyFormPage;