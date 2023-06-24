import { useAppDispatch } from "@/app/redux/hook";
import { setSelectedForm } from "@/app/redux/slice/formController.slice";
import { ChevronLeft } from "lucide-react";

const CreateFormSearchDB = () => {
  const dispatch = useAppDispatch();
  const handleBack = () => {
    dispatch(setSelectedForm({ selectedForm: "" }));
  };

  return (
    <div>
      <div
        onClick={handleBack}
        className="flex items-center text-muted-foreground hover:underline cursor-pointer"
      >
        <ChevronLeft className="h-5 w-5" />
        Back
      </div>
      <h1 className="font-bold text-2xl mt-2">Create a Form from Database</h1>
      <p className="text-muted-foreground mt-2">
        Select one of your existing Notion databases to generate a form from it.
      </p>
    </div>
  );
};

export default CreateFormSearchDB;
