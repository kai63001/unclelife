import ListMyDatabase from "@/app/(dashboard)/form/create/components/ListMyDatabase";
import {Suspense} from "react";
import ListMyDatabaseLoading from "@/app/(dashboard)/form/create/components/ListMyDatabaseLoading";

export const metadata = {
    title: "Uncle Life - Design Your Custom Notion Form",
    description: "Begin your journey with Uncle Life's intuitive form creator. Design, tailor, and launch custom Notion forms that fit your needs and integrate seamlessly with your workspace.",
};

const CreateFormPage = () => {
    return (
        <div>
            <h1 className={'text-4xl font-bold'}>Create a Form</h1>
            <p className={'text-muted-foreground'}>
                Choose a database to create a form from it.
            </p>
            <Suspense fallback={<ListMyDatabaseLoading/>}>
                <ListMyDatabase/>
            </Suspense>
        </div>
    );
};

export default CreateFormPage;
