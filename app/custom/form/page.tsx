"use client";

import { useAppSelector } from "@/app/redux/hook";
import { Input } from "@/components/ui/input";

const CreateFormCustomPage = () => {
  const { form, layer } = useAppSelector((state) => state.formReducer);
  return (
    <div className="max-w-2xl w-full h-fit">
      <div className=" border-2 border-dashed p-5 w-full rounded-sm">
        <h1 className="text-2xl font-bold">
            {form.title}
        </h1>
        {layer.map((item: any, index: number) => {
          return (
            <div key={index} className="mt-5">
              <p className="text-xl font-bold">{item.name}</p>
              <Input
                placeholder={item.name}
                className="focus:outline-none focus-visible:ring-0 text-black"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateFormCustomPage;
