import { Input } from "@/components/ui/input";

const ToolsBar = () => {
  return (
    <div className="text-black h-screen w-96 flex flex-col border-r px-3 ">
        <b className="mt-5 mb-3">INFORMATION</b>
        <p className="text-xs font-bold">TITLE OF YOUR FORM <span className="text-red-500">*</span></p>
        <Input placeholder="Contact Form" className="focus:outline-none focus-visible:ring-0" />
    </div>
  );
};

export default ToolsBar;
