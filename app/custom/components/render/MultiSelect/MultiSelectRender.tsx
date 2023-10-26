"use client";

import { Label } from "@/components/ui/label";
import { ChevronDown, Check } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import RequiredStar from "../RequireStar";
import { useAppSelector } from "@/app/redux/hook";
import { calculateTextColor } from "@/lib/formController";

const MultiSelectRender = ({
  data,
  updateInputForm,
  error,
  isSubscribed,
}: any) => {
  const { form } = useAppSelector((state) => state.formReducer);
  const [selected, setSelected]: any = useState([]);
  const [open, setOpen] = useState(false);

  const handleSelectChange = async (id: number) => {
    await setSelected((prevSelected: any): any => {
      if (prevSelected.includes(id)) {
        updateInputForm(
          prevSelected.filter((i: any) => i !== id),
          data
        );
        return prevSelected.filter((i: any) => i !== id);
      } else {
        updateInputForm([...prevSelected, id], data);
        return [...prevSelected, id];
      }
    });
  };

  const handleButtonClick = () => {
    setOpen(!open);
  };
  const modalRef: any = useRef(null);
  const buttonRef: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [modalRef]);

  return data.hidden ? (
    <></>
  ) : (
    <div className="relative">
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
      {data.required && data?.pro?.hideFieldName && isSubscribed && (
        <div className="absolute -top-2 -right-2">
          <RequiredStar />
        </div>
      )}
      <div className="w-full">
        <button
          ref={buttonRef}
          disabled={data.disable}
          type="button"
          className={`flex shadow-sm ${
            error && "border border-red-500"
          } focus-visible:ring-2 hover:shadow-md focus:outline-0 min-h-10 items-center justify-between rounded-md border border-input bg-transparent px-3 h-10 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full`}
          onClick={handleButtonClick}
          style={{
            backgroundColor:
              form?.pro?.customizations?.light?.enableBackgroundColor &&
              isSubscribed
                ? form?.pro?.customizations?.light?.inputColor
                : null,
            color:
              form?.pro?.customizations?.light?.enableBackgroundColor &&
              isSubscribed
                ? calculateTextColor(form?.pro?.customizations?.light?.inputColor)
                : undefined,
          }}
        >
          {selected.length > 0 ? (
            <div className="flex flex-wrap">
              {selected.map((item: any, index: any) => (
                <div
                  key={index}
                  className="flex items-center justify-center px-2 m-1 bg-primary text-secondary rounded-sm text-xs h-5"
                  style={{
                    backgroundColor:
                      form?.pro?.customizations?.light?.enableBackgroundColor &&
                      isSubscribed
                        ? form?.pro?.customizations?.light?.primaryColor
                        : null,
                    color:
                      form?.pro?.customizations?.light?.enableBackgroundColor &&
                      isSubscribed
                        ? calculateTextColor(form?.pro?.customizations?.light?.primaryColor)
                        : undefined,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <div className={"h-5"}>
              {data?.pro?.placeholder && isSubscribed
                ? data?.pro?.placeholder
                : ""}
            </div>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </div>
      {open && (
        <div
          ref={modalRef}
          className="origin-top-right z-50 absolute right-0 mt-2 w-full px-1 rounded-md bg-background shadow-lg text-black ring-1 ring-black ring-opacity-5 border"
        >
          <div className="py-1" role="menu">
            {data?.options?.map((option: any, index: any) => (
              <div
                key={index}
                className="px-4 py-1.5 text-sm text-primary rounded-sm hover:bg-input hover:text-primary flex cursor-pointer items-center w-full select-none bor-d"
                role="menuitem"
                onClick={() => handleSelectChange(option.name)}
              >
                <span className="absolute left-2 flex h-5 w-5 items-center justify-center">
                  {selected.includes(option.name) && (
                    <Check className="h-4 w-4" />
                  )}
                </span>
                <div className="ml-4">{option.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!data?.helpPositionAboveInput &&
        data?.helpPositionAboveInput != undefined && (
          <p
            className="text-muted-foreground text-xs"
            dangerouslySetInnerHTML={{
              __html: data?.help,
            }}
          ></p>
        )}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default MultiSelectRender;
