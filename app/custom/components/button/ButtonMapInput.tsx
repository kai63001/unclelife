"use client";
import { useAppSelector } from "@/app/redux/hook";
import ModalMapInput from "../modal/mapInput";

const ButtonMapInput = () => {
  const { workspaceId } = useAppSelector((state) => state.formReducer);

  return <div>{workspaceId && <ModalMapInput />}</div>;
};

export default ButtonMapInput;
