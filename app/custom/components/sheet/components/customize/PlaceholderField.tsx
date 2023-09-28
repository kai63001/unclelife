import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PlaceholderField = ({ data, onChange }:any) => {
  return (
    <div>
      <Label htmlFor={"placeholder"}>Empty Input Text (Placeholder) :</Label>
      <Input
        id={"placeholder"}
        name={"placeholder"}
        value={data?.pro?.placeholder}
        onChange={(e) => {
            onChange(e.target.value, "placeholder", "");
        }}
      />
    </div>
  );
};

export default PlaceholderField;
