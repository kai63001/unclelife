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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!databaseId && !workspaceId) {
        setShowButton(true);
      }
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [databaseId, workspaceId]);
  if (loading) {
    return null;
  }

  if (!databaseId && workspaceId) {
    return <ButtonCreateDatabase session={session} />;
  } else if (showButton) {
    return <ButtonCreateDatabase session={session} />;
  }

  return <ButtonSaveCustomForm session={session} />;
};

export default ControllerButtonSave;
