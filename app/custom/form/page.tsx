import FormMainBox from "../components/formMain";
import SuccessPageComponent from "../components/successPage";
import AlertUserUsingPro from "@/app/custom/components/alert/AlertUserUsingPro";

const CreateFormCustomPage = () => {
    return (
        <div className="max-w-2xl w-full h-fit rounded-sm flex flex-col space-y-10">
            <div>
                <AlertUserUsingPro/>
            </div>
            <div>
                <p className="mb-2">Page 1</p>
                <div className="max-w-2xl w-full h-fit bg-background rounded-sm">
                    <div className="border-2 border-dashed w-full h-full rounded-sm relative">
                        <FormMainBox testMode={true}/>
                    </div>
                </div>
            </div>
            <div>
                <p className="mb-2">Page Success</p>
                <div className="max-w-2xl w-full h-fit bg-background rounded-sm">
                    <div className="border-2 border-dashed p-5 w-full h-full rounded-sm">
                        <SuccessPageComponent testMode={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateFormCustomPage;
