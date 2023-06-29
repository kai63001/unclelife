import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TitleRender = ({ data,type='text' }: any) => {
  return (
    <div>
      <Label className="">{data.label}</Label>
      <Input className="" type={type} />
    </div>
  );
};

export default TitleRender;
