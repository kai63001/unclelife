import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RequiredStar from "../RequireStar";

const RichTextRender = ({ data }: any) => {
  return data.hidden ? (
    <></>
  ) : (
    <div>
      <Label className="">{data.label}{data.required && <RequiredStar />}</Label>
      <Textarea disabled={data.disable} required={data.required} />
    </div>
  );
};

export default RichTextRender;
