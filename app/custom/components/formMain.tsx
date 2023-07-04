"use client";
import { useAppSelector } from "@/app/redux/hook";
import RenderFormComponent from "../components/render/RenderForm";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const FormMainBox = ({ id = null }: { id?: string | null }) => {
  const supabase = createClientComponentClient();
  const [dataForm, setDataForm] = useState<any>({});
  const [dataLayer, setDataLayer] = useState<any>([]);
  const { form, layer } = useAppSelector((state) => state.formReducer);

  useEffect(() => {
    //supabase
    if (id != null) {
      if (!supabase) return;
      supabase
        .from("form")
        .select("layer")
        .eq("id", id)
        .then((res:any) => {
            console.log(res.data[0].layer)
            setDataLayer(res.data[0].layer)
        });

      return;
    }
    setDataForm(form);
    setDataLayer(layer);
  }, [form, id, layer, supabase]);

  return (
    <>
      <h1 className="text-2xl font-bold">{form.title}</h1>
      {form.description && (
        <p className="text-gray-400 text-sm">{form.description}</p>
      )}
      {dataLayer.map((item: any, index: number) => {
        return <RenderFormComponent data={item} key={index} />;
      })}
      <div className="mt-3">
        <Button className="px-10">Submit</Button>
      </div>
      {/* power by */}
      <div className="mt-5 text-xs text-gray-400 text-center border-t pt-5 mx-10 border-opacity-10 border-gray-400">
        <p>
          Power by{" "}
          <a href="" target="_blank" className="text-blue-500 hover:underline">
            Uncle Life
          </a>
        </p>
      </div>
    </>
  );
};

export default FormMainBox;
