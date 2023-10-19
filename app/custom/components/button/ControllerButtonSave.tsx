"use client";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/app/redux/hook";
import ButtonCreateDatabase from "./ButtonCreateDatabase";
import ButtonSaveCustomForm from "./ButtonSave";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ControllerButtonSave = ({ session }: any) => {
  const { databaseId, workspaceId } = useAppSelector(
    (state) => state.formReducer
  );
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!databaseId && !workspaceId) {
        setShowButton(true);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [databaseId, workspaceId]);

  if (!databaseId && workspaceId) {
    return <ButtonCreateDatabase session={session} />;
  } else if (showButton) {
    return (
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You need to select a workspace to create a form
            </AlertDialogTitle>
            <AlertDialogDescription>
              Back to create form and select a workspace to create a form
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Link href={"/form/create"}>Create Form</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return <ButtonSaveCustomForm session={session} />;
};

export default ControllerButtonSave;
