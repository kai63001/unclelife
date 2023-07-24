"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setForm } from "@/app/redux/slice/formController.slice";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      <div className="flex flex-col px-5 shadow-me h-full rounded-lg bg-white">
        <b className="mt-5 mb-5">INFORMATION</b>
        <div className="mb-3">
          <div className="text-xs font-bold">
            TITLE OF YOUR FORM <span className="text-red-500">*</span>
          </div>
          <Input
            placeholder="Contact Form"
            className="focus:outline-none focus-visible:ring-0 text-black"
            onChange={(e) => onChangeHook(e.target.value, "title")}
            value={form.title}
          />
        </div>
        <div>
          <p className="text-xs font-bold">DESCRIPTION</p>
          <Textarea
            onChange={(e) => {
              onChangeHook(e.target.value, "description");
            }}
            className="focus:outline-none focus-visible:ring-0 bg-white text-black"
          />
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Button Submit</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                <div className="text-xs font-bold">
                  TEXT OF BUTTON SUBMIT <span className="text-red-500">*</span>
                </div>
                <Input
                  placeholder="Submit"
                  className="focus:outline-none focus-visible:ring-0 text-black"
                  onChange={(e) =>
                    onChangeHook(
                      {
                        text: e.target.value,
                      },
                      "button"
                    )
                  }
                  value={form?.button?.text}
                />
                <div className="text-xs font-bold">
                  BUTTON COLOR <span className="text-red-500">*</span>
                </div>
                <Input
                  placeholder="Submit"
                  type="color"
                  className="focus:outline-none focus-visible:ring-0 text-black p-0 w-10 border-0"
                  onChange={(e) =>
                    onChangeHook(
                      {
                        color: e.target.value,
                      },
                      "button"
                    )
                  }
                  value={form?.button?.color}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ToolsBar;
