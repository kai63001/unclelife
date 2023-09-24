"use client";
import { useAppSelector } from "@/app/redux/hook";
import ModalMapInput from "../modal/mapInput";

const ButtonMapInput = () => {
  const { databaseId } = useAppSelector((state) => state.formReducer);

  return <div>{databaseId && <ModalMapInput />}</div>;
};

export default ButtonMapInput;
