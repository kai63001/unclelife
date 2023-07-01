"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setForm } from "@/app/redux/slice/formController.slice";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ToolsBar = () => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector((state) => state.formReducer);

  const onChangeHook = (e: any, name: string) => {
    dispatch(
      setForm({
        name,
        value: e.target.value,
      })
    );
  };

  return (
    <div className="text-[#3d3d3d] h-screen w-96 fixed left-0 pb-5 pt-20 pl-5 z-40">
      <div className="flex flex-col px-5 shadow-me h-full rounded-lg bg-white">
        <b className="mt-5 mb-5">INFORMATION</b>
        <div className="mb-3">
          <p className="text-xs font-bold">
            TITLE OF YOUR FORM <span className="text-red-500">*</span>
          </p>
          <Input
            placeholder="Contact Form"
            className="focus:outline-none focus-visible:ring-0 text-black"
            onChange={(e) => onChangeHook(e, "title")}
            value={form.title}
          />
        </div>
        <div>
          <p className="text-xs font-bold">DESCRIPTION</p>
          <Textarea
            onChange={(e) => {
              onChangeHook(e, "description");
            }}
            className="focus:outline-none focus-visible:ring-0 bg-white text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default ToolsBar;
