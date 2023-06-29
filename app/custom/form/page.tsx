"use client";

import { useAppSelector } from "@/app/redux/hook";
import RenderFormComponent from "../components/render/RenderForm";

const CreateFormCustomPage = () => {
  const { form, layer } = useAppSelector((state) => state.formReducer);
  return (
    <div className="max-w-2xl w-full h-fit">
      <div className=" border-2 border-dashed p-5 w-full rounded-sm">
        <h1 className="text-2xl font-bold">{form.title}</h1>
        {layer.map((item: any, index: number) => {
          return <RenderFormComponent data={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default CreateFormCustomPage;
