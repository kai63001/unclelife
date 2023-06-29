'use client'
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
    <div className="text-[#3d3d3d] bg-[#FBFBFA] h-screen w-96 flex flex-col border-r px-3 fixed left-0">
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
        <Textarea className="focus:outline-none focus-visible:ring-0 bg-white text-black" />
      </div>
    </div>
  );
};

export default ToolsBar;
