import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Database} from "lucide-react";
import {useAppDispatch} from "@/app/redux/hook";
import {setSelectedForm, clearAllData} from "@/app/redux/slice/formController.slice";

const CreateFormMainPage = () => {
    const dispatch = useAppDispatch();
    const handleCreateFormDB = () => {
        dispatch(setSelectedForm("DB"));
    };

    const handleCreateDatabase = () => {
        dispatch(clearAllData());
        //route
        // router.push("/custom/form")
        window.location.href = "/custom/form";
    }

    return (
        <div>
            <h1 className="font-bold text-2xl">Create a Form</h1>
            <p className="text-muted-foreground mt-2">
                You have the option to either construct a form using an already existing
                Notion database, or to create a brand new form, in which case we will
                generate the corresponding Notion database for you.
            </p>
            {/* middle selection card box */}
            <div className="mt-5 grid grid-cols-2 gap-4">
                <Card
                    onClick={handleCreateFormDB}
                    className="cursor-pointer hover:bg-primary hover:text-secondary duration-300"
                >
                    <CardContent className="w-full text-center p-0 mt-5">
                        <Database className="h-20 w-20 mx-auto"/>
                    </CardContent>
                    <CardHeader className="text-center">
                        <CardTitle>I already have a Notion database</CardTitle>
                        <CardDescription>
                            The form will be generated from the database.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card
                    onClick={handleCreateDatabase}
                    className="cursor-pointer hover:bg-primary hover:text-secondary duration-300"
                >
                    <CardContent className="w-full text-center p-0 mt-5">
                        <Database className="h-20 w-20 mx-auto"/>
                    </CardContent>
                    <CardHeader className="text-center">
                        <CardTitle>Create a Notion database</CardTitle>
                        <CardDescription>
                            The form will be create database.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
};

export default CreateFormMainPage;
