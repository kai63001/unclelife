import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database } from "lucide-react";

const CreateFormMainPage = () => {
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
        <Card className="cursor-pointer hover:bg-primary hover:text-secondary duration-300">
          <CardContent className="w-full text-center p-0 mt-5">
            <Database className="h-20 w-20 mx-auto" />
          </CardContent>
          <CardHeader className="text-center">
            <CardTitle>I already have a Notion database</CardTitle>
            <CardDescription>
              The form will be generated from the database.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default CreateFormMainPage;
