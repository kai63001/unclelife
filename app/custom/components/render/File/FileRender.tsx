"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RequiredStar from "../RequireStar";
import { Button } from "@/components/ui/button";
import { Upload, Trash } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import * as React from "react";
import { useAppSelector } from "@/app/redux/hook";
import { calculateTextColor } from "@/lib/formController";

const FileRender = ({
  data,
  updateInputForm,
  error,
  isSubscribed,
  inputForm,
}: any) => {
  const { form } = useAppSelector((state) => state.formReducer);
  const [file, setFile] = useState<any>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    if (inputForm[data.mapTo]?.value) {
      setFile(inputForm[data.mapTo]?.value);
    }
  }, [data.mapTo, inputForm]);

  const onFileChange = (e: any) => {
    const file = e.target.files[0];
    //limit file size 5mb
    if (file.size > 5000000) {
      toast({
        description: "File size should be less than 5MB.",
        title: "File size too large",
        variant: "destructive",
      });
      return;
    }
    if (file) {
      const reader = new FileReader();
      // to base64
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result;
        const name = file.name;
        updateInputForm(`${base64}__name__${name}`, data);
        //set file name
        setFile(name);
      };
    }
  };

  return data.hidden ? (
    <></>
  ) : (
    <div className="relative mb-2">
      {data?.pro?.hideFieldName && isSubscribed ? null : (
        <Label htmlFor={data.label} className="text-lg font-bold cursor-text">
          <span
            className="inline-block"
            dangerouslySetInnerHTML={{
              __html: data?.label,
            }}
          ></span>
          {data.required && <RequiredStar />}
        </Label>
      )}
      {(data?.helpPositionAboveInput ||
        data?.helpPositionAboveInput == undefined) && (
        <p
          className="text-muted-foreground text-sm my-2"
          dangerouslySetInnerHTML={{
            __html: data?.help,
          }}
        ></p>
      )}
      {data.required && data?.pro?.hideFieldName && isSubscribed && (
        <div className="absolute -top-2 -right-2">
          <RequiredStar />
        </div>
      )}
      {file ? (
        <div>
          <div className="flex items-center space-x-2 shadow-sm">
            <div
              style={{
                backgroundColor:
                  form?.pro?.customizations?.light?.enableBackgroundColor &&
                  isSubscribed
                    ? form?.pro?.customizations?.light?.inputColor
                    : null,
                color:
                  form?.pro?.customizations?.light?.enableBackgroundColor &&
                  isSubscribed
                    ? calculateTextColor(
                        form?.pro?.customizations?.light?.inputColor
                      )
                    : undefined,
              }}
              className="flex w-full border px-3 py-2 rounded-md overflow-hidden"
            >
              <p
                className={
                  "text-ellipsis overflow-hidden max-w-[370px] whitespace-nowrap"
                }
              >
                {file}
              </p>
            </div>
            <Button
              asChild
              onClick={() => {
                setFile(null);
                updateInputForm(null, data);
              }}
              style={{
                backgroundColor:
                  form?.pro?.customizations?.light?.enableBackgroundColor &&
                  isSubscribed
                    ? form?.pro?.customizations?.light?.primaryColor
                    : null,
                color:
                  form?.pro?.customizations?.light?.enableBackgroundColor &&
                  isSubscribed
                    ? calculateTextColor(
                        form?.pro?.customizations?.light?.primaryColor
                      )
                    : undefined,
              }}
            >
              <Label className="flex flex-col space-y-2 cursor-pointer">
                <Trash className="h-4 w-4" />
              </Label>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Button
            className={error && "bg-red-500 text-white shadow-sm"}
            style={{
              backgroundColor:
                form?.pro?.customizations?.light?.enableBackgroundColor &&
                isSubscribed
                  ? form?.pro?.customizations?.light?.primaryColor
                  : null,
              color:
                form?.pro?.customizations?.light?.enableBackgroundColor &&
                isSubscribed
                  ? calculateTextColor(
                      form?.pro?.customizations?.light?.primaryColor
                    )
                  : undefined,
            }}
            asChild
          >
            <Label
              htmlFor={"uploadFileForm"}
              className={`flex space-x-2 cursor-pointer`}
            >
              Upload File
              <Upload className="ml-2 h-4 w-4" />
            </Label>
          </Button>
          <Input
            className="hidden"
            onChange={onFileChange}
            name={data.label}
            placeholder={
              data?.pro?.placeholder && isSubscribed
                ? data?.pro?.placeholder
                : ""
            }
            id={"uploadFileForm"}
            disabled={data.disable}
            required={data.required}
            type={"file"}
          />
        </>
      )}
      <div className={"text-xs text-muted-foreground mt-1"}>
        File size should be less than 5MB.{" "}
      </div>
      {!data?.helpPositionAboveInput &&
        data?.helpPositionAboveInput != undefined && (
          <p
            className="text-muted-foreground text-sm my-2"
            dangerouslySetInnerHTML={{
              __html: data?.help,
            }}
          ></p>
        )}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default FileRender;
