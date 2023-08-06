import RenderMyFormLoading from "@/app/(dashboard)/form/my/RenderMyFormLoading";
import RenderMyForm from "@/app/(dashboard)/form/my/RenderMyForm";
import {Suspense} from "react";

const DashboardPage = () => {
    return (
        <div>
            <Suspense fallback={<RenderMyFormLoading/>}>
                <RenderMyForm limit={4}/>
            </Suspense>
        </div>
    );
};

export default DashboardPage;
