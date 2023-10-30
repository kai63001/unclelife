"use client";
import { Label } from "@/components/ui/label";
import RequiredStar from "@/app/custom/components/render/RequireStar";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/hook";
import {
  calculateTextColor,
  convertNumberToAlphabet,
} from "@/lib/formController";
import { cn } from "@/lib/utils";

const RadioRender = ({
  data,
  updateInputForm,
  error,
  isSubscribed,
  inputForm,
}: any) => {
  const { form } = useAppSelector((state) => state.formReducer);
  const [selected, setSelected] = useState<any>(null);

  const inputOnChange = (e: any) => {
    if (data.disable) return;
    setSelected(e);
    updateInputForm(e, data);
  };

  useEffect(() => {
    if (inputForm[data.mapTo]?.value) {
      setSelected(inputForm[data.mapTo]?.value);
    }
  }
  , [data.mapTo, inputForm]);

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
      <div className={cn(`mt-1 grid gap-3`, data?.gridLayout)}>
        {data?.options?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              onClick={() => inputOnChange(item.name)}
              className={`shadow-sm flex ${
                data.disable ? "cursor-not-allowed" : "cursor-pointer"
              } ${error && "border border-red-500"} items-center w-full ${
                selected == item.name ? "border-2 border-primary" : "border"
              } py-3 rounded-sm select-none`}
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
                borderColor:
                  selected == item.name &&
                  form?.pro?.customizations?.light?.enableBackgroundColor &&
                  isSubscribed
                    ? form?.pro?.customizations?.light?.secondaryColor
                    : undefined,
              }}
            >
              {data.headerOption != "hide" && (
                <div
                  className="bg-primary font-bold text-secondary h-5 w-5 text-center items-center flex justify-center rounded-sm ml-5"
                  style={{
                    backgroundColor:
                      form?.pro?.customizations?.light?.enableBackgroundColor &&
                      isSubscribed
                        ? selected == item.name
                          ? form?.pro?.customizations?.light?.secondaryColor
                          : form?.pro?.customizations?.light?.primaryColor
                        : undefined,
                    color:
                      form?.pro?.customizations?.light?.enableBackgroundColor &&
                      isSubscribed
                        ? selected == item.name
                          ? calculateTextColor(
                              form?.pro?.customizations?.light?.secondaryColor
                            )
                          : calculateTextColor(
                              form?.pro?.customizations?.light?.primaryColor
                            )
                        : undefined,
                  }}
                >
                  {(data.headerOption == "number" || !data.headerOption) &&
                    index + 1}
                  {data.headerOption == "alphabet" &&
                    convertNumberToAlphabet(index)}
                </div>
              )}

              <label
                className={`ml-3 block text-sm font-medium cursor-pointer`}
              >
                {item.name}
              </label>
            </div>
          );
        })}
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

export default RadioRender;
