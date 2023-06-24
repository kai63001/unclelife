"use client";
import dynamic from "next/dynamic";
import CreateFormSearchDB from "./searchDB";
import { useAppSelector } from "@/app/redux/hook";
const CreateFormMainPage = dynamic(() => import("./main"), { ssr: false });

const CreateFormSelection = () => {
  const { selectedForm } = useAppSelector((state) => state.formReducer);
  return (
    <div>
      {selectedForm === "DB" ? <CreateFormSearchDB /> : <CreateFormMainPage />}
    </div>
  );
};

export default CreateFormSelection;
