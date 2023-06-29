"use client";

import { useAppSelector } from "@/app/redux/hook";
import RenderFormComponent from "../components/render/RenderForm";
import { Button } from "@/components/ui/button";

const CreateFormCustomPage = () => {
  const { form, layer } = useAppSelector((state) => state.formReducer);
  return (
    <div className="max-w-2xl w-full h-fit">
      <div className="border-2 border-dashed p-5 w-full rounded-sm">
        <h1 className="text-2xl font-bold">{form.title}</h1>
        {layer.map((item: any, index: number) => {
          return <RenderFormComponent data={item} key={index} />;
        })}
        <div className="mt-3">
          <Button className="px-10">Submit</Button>
        </div>
        {/* power by */}
        <div className="mt-5 text-xs text-gray-400 text-center border-t pt-5 mx-10 border-opacity-10 border-gray-400">
          <p>
            Power by{" "}
            <a
              href=""
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              Uncle Life
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateFormCustomPage;
