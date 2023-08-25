import ListMyDatabase from "@/app/(dashboard)/form/create/components/ListMyDatabase";
import {Suspense} from "react";

const CreateFormPage = () => {
    return (
        <div>
            <h1 className={'text-4xl font-bold'}>Create a Form</h1>
            <p className={'text-muted-foreground'}>
                Choose a database to create a form from it.
            </p>
            <Suspense fallback={'Loading'}>
                <ListMyDatabase/>
            </Suspense>
        </div>
    );
};

export default CreateFormPage;
