import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RequiredStar from "../RequireStar";

const RichTextRender = ({ data, updateInputForm }: any) => {
  return data.hidden ? (
    <></>
  ) : (
    <div>
      <Label htmlFor={data.name} className="">
        {data.label}
        {data.required && <RequiredStar />}
      </Label>
      <Textarea
        onChange={(e) => updateInputForm(e.target.value, data.name)}
        name={data.name}
        id={data.name}
        disabled={data.disable}
        required={data.required}
      />
    </div>
  );
};

export default RichTextRender;
