import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ToolsBar = () => {
  return (
    <div className="text-[#3d3d3d] bg-[#FBFBFA] h-screen w-96 flex flex-col border-r px-3 ">
      <b className="mt-5 mb-5">INFORMATION</b>
      <div className="mb-3">
        <p className="text-xs font-bold">
          TITLE OF YOUR FORM <span className="text-red-500">*</span>
        </p>
        <Input
          placeholder="Contact Form"
          className="focus:outline-none focus-visible:ring-0 text-black"
        />
      </div>
      <div>
        <p className="text-xs font-bold">
          DESCRIPTION
        </p>
        <Textarea className="focus:outline-none focus-visible:ring-0 bg-white text-black"/>
      </div>
    </div>
  );
};

export default ToolsBar;
