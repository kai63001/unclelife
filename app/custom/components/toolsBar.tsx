"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setForm } from "@/app/redux/slice/formController.slice";
import { Input } from "@/components/ui/input";
import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import ButtonSubmit from "@/app/custom/components/toolsbar/ButtonSubmit";
import CustomizationToolbar from "@/app/custom/components/toolsbar/CustomizationToolbar";
import CustomCssToolBar from "@/app/custom/components/toolsbar/CustomCssToolBar";
import SuccessPageCustomComponent from "@/app/custom/components/toolsbar/SuccessPage";
import RichTextEditor from "@/components/RichTextEditor";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { debounce } from "lodash";

const ToolsBar = () => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector((state) => state.formReducer);
  const [active, setActive] = useState(true);

  const onChangeHook = (e: any, name: any) => {
    dispatch(
      setForm({
        name,
        value: e,
      })
    );
  };

  useEffect(() => {
    const updateWindowDimensions = debounce(() => {
      const innerWidth = window.innerWidth;
      if (innerWidth < 768) {
        setActive(false);
      }else{
        setActive(true);
      }
    }, 500);

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  return (
    <div
      className={cn(
        "text-[#3d3d3d] w-[150px] md:w-[350px] fixed left-0 pb-5 pt-20 pl-5 z-50",
        active ? "h-full w-full md:w-[350px] pr-5" : "h-16 bottom-32 md:top-10"
      )}
    >
      <div
        className={cn(
          "flex flex-col pl-5 shadow-me rounded-xl bg-background text-primary duration-200",
          active ? "h-full" : "h-16"
        )}
      >
        <div className="flex items-center justify-between">
          <b className="mt-5 mb-5 hidden md:block">INFORMATION</b>
          <b className="mt-5 mb-5 mr-5 block md:hidden">INFO</b>
          <div className="pr-5">
            <Button
              onClick={() => {
                setActive(!active);
              }}
              variant={"outline"}
              size={"icon"}
            >
              {active ? <Eye size={16} /> : <EyeOff size={16} />}
            </Button>
          </div>
        </div>
        <ScrollArea className={"pr-5"}>
          <div className="mb-3">
            <div className="text-xs font-bold">
              TITLE OF YOUR FORM <span className="text-red-500">*</span>
            </div>
            <Input
              placeholder="Contact Form"
              className="focus:outline-none focus-visible:ring-0 text-primary"
              onChange={(e) => onChangeHook(e.target.value, "title")}
              value={form.title}
            />
          </div>
          <div>
            <p className="text-xs font-bold">DESCRIPTION</p>
            <RichTextEditor
              content={form?.description}
              onChange={(e: any) => {
                onChangeHook(e, "description");
              }}
            />
          </div>

          <Accordion
            type="multiple"
            defaultValue={["buttonSubmit", "customization"]}
            className="w-full"
          >
            <CustomizationToolbar onChangeHook={onChangeHook} form={form} />
            <ButtonSubmit onChangeHook={onChangeHook} form={form} />
            <SuccessPageCustomComponent
              onChangeHook={onChangeHook}
              form={form}
            />
            <CustomCssToolBar onChangeHook={onChangeHook} form={form} />
          </Accordion>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ToolsBar;
