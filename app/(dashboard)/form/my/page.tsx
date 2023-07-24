import {Suspense} from "react";
import RenderMyForm from "@/app/(dashboard)/form/my/RenderMyForm";
import RenderMyFormLoading from "@/app/(dashboard)/form/my/RenderMyFormLoading";

const MyFormPage = () => {
    return (
        <Suspense fallback={<RenderMyFormLoading/>}>
            <RenderMyForm/>
        </Suspense>
    )
}

export default MyFormPage;