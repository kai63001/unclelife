"use client";
import { Label } from "@/components/ui/label";
import RequiredStar from "@/app/custom/components/render/RequireStar";
import { useState } from "react";

const RadioRender = ({ data, updateInputForm, error, isSubscribed }: any) => {
  const [selected, setSelected] = useState<any>(null);

  const inputOnChange = (e: any) => {
    if (data.disable) return;
    setSelected(e);
    updateInputForm(e, data);
  };

  return data.hidden ? (
    <></>
  ) : (
    <>
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
            className="text-muted-foreground text-xs"
            dangerouslySetInnerHTML={{
              __html: data?.help,
            }}
          ></p>
        )}
      <div className="mt-1 flex space-y-2 flex-col">
        {data?.options?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              onClick={() => inputOnChange(item.name)}
              className={`shadow-sm flex ${
                data.disable ? "cursor-not-allowed" : "cursor-pointer"
              } ${error && "border border-red-500"} items-center w-full ${
                selected == item.name ? "bg-primary" : "bg-secondary"
              } py-3 rounded-sm select-none`}
            >
              <label
                className={`ml-3 block text-sm font-medium ${
                  selected == item.name ? "text-secondary" : "text-primary"
                } cursor-pointer`}
              >
                {item.name}
              </label>
            </div>
          );
        })}
      </div>
      {(!data?.helpPositionAboveInput && data?.helpPositionAboveInput != undefined) && (
        <p
          className="text-muted-foreground text-xs"
          dangerouslySetInnerHTML={{
            __html: data?.help,
          }}
        ></p>
      )}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </>
  );
};

export default RadioRender;
