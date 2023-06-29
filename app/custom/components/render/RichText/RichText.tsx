import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const RichTextRender = ({ data }: any) => {
  return (
    <div>
      <Label className="">{data.label}</Label>
      <Textarea />
    </div>
  );
};

export default RichTextRender;
