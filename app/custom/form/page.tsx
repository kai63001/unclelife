"use client";

import { useAppSelector } from "@/app/redux/hook";

const CreateFormCustomPage = () => {
  const { form } = useAppSelector((state) => state.formReducer);
  return (
    <div className="max-w-2xl w-full h-fit">
      <div className=" border-2 border-dashed p-5 w-full rounded-sm">
        <h1 className="text-2xl font-bold">
            {form.title}
        </h1>
      </div>
    </div>
  );
};

export default CreateFormCustomPage;
