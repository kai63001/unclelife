"use client";

import { useAppSelector } from "@/app/redux/hook";
import ButtonCreateDatabase from "./ButtonCreateDatabase";
import ButtonSaveCustomForm from "./ButtonSave";

const ControllerButtonSave = ({ session }: any) => {
  const { databaseId, workspaceId } = useAppSelector((state) => state.formReducer);
  console.log(databaseId, workspaceId)

  if (!databaseId && workspaceId) {
    return <ButtonCreateDatabase session={session} />;
  }else if(!databaseId && !workspaceId){
    return <div></div>
  }

  return <ButtonSaveCustomForm session={session} />;
};

export default ControllerButtonSave;
