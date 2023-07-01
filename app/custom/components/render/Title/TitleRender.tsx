import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TitleRender = ({ data, type = "text" }: any) => {
  return data.hidden ? (
    <></>
  ) : (
    <div>
      <Label className="">{data.label}</Label>
      <Input
        className=""
        disabled={data.disable}
        required={data.required}
        type={type}
      />
    </div>
  );
};

export default TitleRender;
