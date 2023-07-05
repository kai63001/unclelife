"use client";
import { useAppSelector } from "@/app/redux/hook";
import RenderFormComponent from "../components/render/RenderForm";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";
import { updateDatabase } from "@/lib/notionApi";
import { Icons } from "@/components/Icons";

const FormMainBox = ({ id = null }: { id?: string | null }) => {
  const { toast } = useToast();
  const supabase = createClientComponentClient();
  const [dataForm, setDataForm] = useState<any>({});
  const [dataLayer, setDataLayer] = useState<any>([]);
  const [databaseId, setDatabaseId] = useState<string>("");
  const { form, layer } = useAppSelector((state) => state.formReducer);
  const [loading, setLoading] = useState(false);

  const [inputForm, setInputForm]: any = useState<any>({});

  const updateInputForm = (value: string, name: string, type: string) => {
    setInputForm({
      ...inputForm,
      [name]: {
        value,
        type,
      },
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
    setLoading(true);
    //loop get all value
    console.log("submit form");

    //loop inputForm create object properties for notion page body
    let properties: any = {};
    for (const [key, value] of Object.entries(inputForm) as any) {
      if (value.type === "title" || value.type === "rich_text") {
        properties[key] = {
          [value.type]: [
            {
              text: {
                content: value.value as string,
              },
            },
          ],
          type: value.type,
        };
      } else if (value.type === "select" || value.type === "status") {
        properties[key] = {
          [value.type]: {
            id: value.value as string,
          },
          type: value.type,
        };
      } else if (value.type === "date") {
        properties[key] = {
          [value.type]: {
            start: value.value as string,
          },
          type: value.type,
        };
      } else if (value.type === "files") {
        properties[key] = {
          [value.type]: [
            {
              //random file name
              name: `${Math.random().toString(36).substring(2, 15)}`,
              external: {
                url: value.value as string,
              },
            },
          ],
          type: value.type,
        };
      } else if (value.type === "multi_select") {
        properties[key] = {
          [value.type]: [
            ...value.value.map((item: any) => {
              return {
                id: item,
              };
            }),
          ],
          type: value.type,
        };
      } else {
        properties[key] = {
          [value.type]: value.value,
          type: value.type,
        };
      }
    }

    updateDatabase(databaseId, properties).finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold">{dataForm?.title}</h1>
      {dataForm?.description && (
        <p className="text-gray-400 text-sm">{dataForm?.description}</p>
      )}
      <form onSubmit={submitForm}>
        {dataLayer?.map((item: any, index: number) => {
          return (
            <RenderFormComponent
              updateInputForm={updateInputForm}
              data={item}
              key={index}
            />
          );
        })}
        <div className="mt-3">
          <Button disabled={loading} className="px-10">
            {loading && <Icons.spinner className="animate-spin mr-2 h-5 w-5" />}
            Submit
          </Button>
        </div>
      </form>
      {/* power by */}
      <div className="mt-5 text-xs text-gray-400 text-center border-t pt-5 mx-10 border-opacity-10 border-gray-400">
        <div>
          Power by{" "}
          <a href="" target="_blank" className="text-blue-500 hover:underline">
            Uncle Life
          </a>
        </div>
      </div>
    </>
  );
};

export default FormMainBox;
