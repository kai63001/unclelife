import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RequiredStar from "../RequireStar";

const TitleRender = ({ data, type = "text" }: any) => {
  return data.hidden ? (
    <></>
  ) : (
    <div>
      <Label className="">
        {data.label}
        {data.required && <RequiredStar />}
      </Label>
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
