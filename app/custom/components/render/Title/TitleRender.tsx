import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RequiredStar from "../RequireStar";

const TitleRender = ({ data, type = "text", updateInputForm }: any) => {
  return data.hidden ? (
    <></>
  ) : (
    <div>
      <Label htmlFor={data.name} className="">
        {data.label}
        {data.required && <RequiredStar />}
      </Label>
      <Input
        className=""
        onChange={(e) => updateInputForm(e.target.value, data.name, data.type)}
        name={data.name}
        id={data.name}
        disabled={data.disable}
        required={data.required}
        type={type}
      />
    </div>
  );
};

export default TitleRender;
