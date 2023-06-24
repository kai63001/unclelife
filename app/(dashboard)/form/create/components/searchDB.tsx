'use client'
import { useAppDispatch } from "@/app/redux/hook";
import { setSelectedForm } from "@/app/redux/slice/formController.slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Client } from "@notionhq/client";

const CreateFormSearchDB = () => {
  const dispatch = useAppDispatch();
  const handleBack = () => {
    dispatch(setSelectedForm({ selectedForm: "" }));
  };


  const onSubmit = async (e: any) => {
    e.preventDefault();
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
      <div>
        <div className="flex w-full max-w-xl mt-5 items-center space-x-2">
          <Input type="link" placeholder="Notion Table Page URL" />
          <Button type="submit" onClick={onSubmit}>
            Continue
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          example:
          https://www.notion.so/workspace/my-todo-63ffb0d41fe94cada5215c113dcdd9d9?pvs=4
        </p>
      </div>
    </div>
  );
};

export default CreateFormSearchDB;
