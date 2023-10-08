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

const ToolsBar = () => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector((state) => state.formReducer);

  const onChangeHook = (e: any, name: any) => {
    dispatch(
      setForm({
        name,
        value: e,
      })
    );
  };

  return (
    <div className="text-[#3d3d3d] h-screen w-96 fixed left-0 pb-5 pt-20 pl-5 z-40">
      <div className="flex flex-col pl-5 shadow-me h-full rounded-xl bg-background text-primary">
        <b className="mt-5 mb-5">INFORMATION</b>
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
