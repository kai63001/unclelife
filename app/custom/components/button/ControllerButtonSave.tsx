"use client";

import { useAppSelector } from "@/app/redux/hook";
import ButtonCreateDatabase from "./ButtonCreateDatabase";
import ButtonSaveCustomForm from "./ButtonSave";

const ControllerButtonSave = ({ session }: any) => {
  const { databaseId, workspaceId } = useAppSelector((state) => state.formReducer);

  if (!databaseId && workspaceId) {
    return <ButtonCreateDatabase />;
  }else if(!databaseId && !workspaceId){
    return <div></div>
  }

  return <ButtonSaveCustomForm session={session} />;
};

export default ControllerButtonSave;
