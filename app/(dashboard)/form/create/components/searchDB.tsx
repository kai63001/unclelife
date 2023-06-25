"use client";
import { useAppDispatch } from "@/app/redux/hook";
import { setSelectedForm } from "@/app/redux/slice/formController.slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { getDatabase } from "@/lib/notionApi";
import { useState } from "react";
import { Icons } from "@/components/Icons";

const CreateFormSearchDB = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notionLink, setNotionLink] = useState<string | any>("");
  const handleBack = () => {
    dispatch(setSelectedForm({ selectedForm: "" }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const databaseId = getNotionIds(notionLink);
    if (!databaseId) {
      setError("Invalid Notion URL");
      setLoading(false);
      return;
    }
    const database = await getDatabase(databaseId);
    console.log(database);

    setLoading(false);
  };

  function getNotionIds(url: string): any {
    const pattern = /[a-f0-9]{32}/;
    const match = url.match(pattern);
    if (match) {
      return match[0];
    } else {
      return null;
    }
  }

  return (
    <div>
      <div
        onClick={handleBack}
        className="flex items-center text-muted-foreground hover:underline cursor-pointer w-fit"
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
          <Input
            type="link"
            onChange={(e) => {
              setNotionLink(e.target.value);
              setError("");
            }}
            placeholder="Notion Table Page URL"
          />
          <Button disabled={loading} type="submit" onClick={onSubmit}>
            {loading && <Icons.spinner className="animate-spin mr-2 h-5 w-5" />}
            Continue
          </Button>
        </div>
        {
            <p className="text-red-500 text-sm mt-2">{error && error}</p>
        }
        <p className="text-xs text-muted-foreground mt-1">
          example:
          https://www.notion.so/workspace/my-todo-63ffb0d41fe94cada5215c113dcdd9d9?pvs=4
        </p>
      </div>
    </div>
  );
};

export default CreateFormSearchDB;
