import {Suspense} from "react";
import RenderMyForm from "@/app/(dashboard)/form/my/RenderMyForm";

const MyFormPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RenderMyForm/>
        </Suspense>
    )
}

export default MyFormPage;