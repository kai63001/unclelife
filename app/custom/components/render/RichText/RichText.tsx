import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const RichTextRender = ({ data }: any) => {
  return data.hidden ? (
    <></>
  ) : (
    <div>
      <Label className="">{data.label}</Label>
      <Textarea disabled={data.disable} required={data.required} />
    </div>
  );
};

export default RichTextRender;
