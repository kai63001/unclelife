import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RequiredStar from "../RequireStar";

const TitleRender = ({
  data,
  type = "text",
  updateInputForm,
  error,
  isSubscribed,
}: any) => {
  return data.hidden ? (
    <></>
  ) : (
    <>
      <Label htmlFor={data.label} className="text-lg font-bold cursor-text">
        {data.label}
        {data.required && <RequiredStar />}
      </Label>
      <Input
        className={`mt-1 block w-full ${
          error ? "border-red-500" : ""
        } shadow-sm`}
        onChange={(e) => updateInputForm(e.target.value, data)}
        name={data.label}
        placeholder={(data?.pro?.placeholder && isSubscribed) ? data?.pro?.placeholder : ''}
        id={data.label}
        disabled={data.disable}
        required={data.required}
        type={type}
      />
      {/*    error message*/}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </>
  );
};

export default TitleRender;
