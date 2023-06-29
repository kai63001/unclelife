import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TitleRender = ({ data }: any) => {
  return (
    <div>
      <Label className="">{data.label}</Label>
      <Input className="" />
    </div>
  );
};

export default TitleRender;
