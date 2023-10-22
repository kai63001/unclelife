import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RenderMyFormLoading from "./RenderMyFormLoading";
import dynamic from "next/dynamic";
const RenderMyForm = dynamic(
  () => import("@/app/(dashboard)/form/my/RenderMyForm"),
  { ssr: false }
);

export const metadata = {
  title: "Uncle Life Form Builder - Craft Your Notion Forms",
  description:
    "Step into Uncle Life's Form Builder, where creating and managing your Notion forms becomes a breeze. Design, customize, and integrate forms seamlessly with your Notion workspace.",
};

const MyFormPage = () => {
  return (
    <div>
      <div className={`mb-3 flex justify-between items-center`}>
        <div>
          <h1 className={`text-2xl font-bold mb-1 uppercase`}>My Form</h1>
          <p className={`text-muted-foreground`}>
            My form is a list of forms that you have created.
          </p>
        </div>
        <Button asChild>
          <Link href={"/form/create"}>Create a form</Link>
        </Button>
      </div>
      <Suspense fallback={<RenderMyFormLoading />}>
        <RenderMyForm />
      </Suspense>
    </div>
  );
};

export default MyFormPage;
