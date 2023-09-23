"use client";

import { useAppSelector } from "@/app/redux/hook";
import ButtonCreateDatabase from "./ButtonCreateDatabase";
import ButtonSaveCustomForm from "./ButtonSave";

const ControllerButtonSave = ({ session }: any) => {
  const { workspaceId } = useAppSelector((state) => state.formReducer);

  if (!workspaceId) {
    return <ButtonCreateDatabase />;
  } ;

  return <ButtonSaveCustomForm session={session} />;
};

export default ControllerButtonSave;
