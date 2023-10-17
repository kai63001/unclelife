"use client";

import { useAppSelector } from "@/app/redux/hook";
import ButtonCreateDatabase from "./ButtonCreateDatabase";
import ButtonSaveCustomForm from "./ButtonSave";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ControllerButtonSave = ({ session }: any) => {
  const { databaseId, workspaceId } = useAppSelector(
    (state) => state.formReducer
  );

  if (!databaseId && workspaceId) {
    return <ButtonCreateDatabase session={session} />;
  } else if (!databaseId && !workspaceId) {
    return (
      <Button variant={"outline"} asChild>
        <Link href={"/form/create"}>
          Database not found, Click here to return to the form creation page
        </Link>
      </Button>
    );
  }

  return <ButtonSaveCustomForm session={session} />;
};

export default ControllerButtonSave;
