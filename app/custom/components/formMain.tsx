"use client";
import { useAppSelector } from "@/app/redux/hook";
import RenderFormComponent from "../components/render/RenderForm";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";
import { updateDatabase } from "@/lib/notionApi";

const FormMainBox = ({ id = null }: { id?: string | null }) => {
  const { toast } = useToast();
  const supabase = createClientComponentClient();
  const [dataForm, setDataForm] = useState<any>({});
  const [dataLayer, setDataLayer] = useState<any>([]);
  const [databaseId, setDatabaseId] = useState<string>("");
  const { form, layer } = useAppSelector((state) => state.formReducer);

  const [inputForm, setInputForm] = useState<any>({});

  const updateInputForm = (key: string, value: string) => {
    setInputForm((prev: any) => {
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    //supabase
    if (id != null) {
      if (!supabase) return;
      try {
        supabase
          .from("form")
          .select("layer,detail,databaseId")
          .eq("id", id)
          .single()
          .then((res: any) => {
            if (res?.error?.message) {
              toast({
                title: "Error",
                description: res?.error?.message,
                variant: "destructive",
              });
              return;
            }
            console.log(res.data);
            setDataLayer(res.data.layer);
            setDataForm(res.data.detail);
            setDatabaseId(res.data.databaseId);
          });
      } catch (error) {
        console.log(error);
      }

      return;
    }
    setDataForm(form);
    setDataLayer(layer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, id, layer, supabase]);

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (databaseId == null) {
      return;
    }
    //loop get all value
    console.log("submit form");
    // updateDatabase(databaseId)
  };

  return (
    <>
      <h1 className="text-2xl font-bold">{dataForm.title}</h1>
      {dataForm.description && (
        <p className="text-gray-400 text-sm">{dataForm.description}</p>
      )}
      <form onSubmit={submitForm}>
        {dataLayer.map((item: any, index: number) => {
          return (
            <RenderFormComponent
              updateInputForm={updateInputForm}
              data={item}
              key={index}
            />
          );
        })}
        <div className="mt-3">
          <Button className="px-10">Submit</Button>
        </div>
      </form>
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
