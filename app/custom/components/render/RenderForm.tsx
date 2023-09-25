import dynamic from "next/dynamic";
import MultiSelectRender from "./MultiSelect/MultiSelectRender";
import CheckBoxRender from "./CheckBox/CheckBoxRender";
import FileRender from "@/app/custom/components/render/File/FileRender";
import RadioRender from "@/app/custom/components/render/Radio/RadioRender";

const TitleRender = dynamic(() => import("./Title/TitleRender"), {
  ssr: false,
});
const RichTextRender = dynamic(() => import("./RichText/RichText"), {
  ssr: false,
});
const DateRender = dynamic(() => import("./Date/DateRender"), {
  ssr: false,
});
const SelectionRender = dynamic(() => import("./Selection/SelectionRender"), {
  ssr: false,
});

const RenderFormComponent = ({
  data,
  updateInputForm,
  dataUser,
  error,
}: any) => {
  const renderCase = () => {
    //return SwitchCase
    switch (data.type) {
      case "title":
        return (
          <TitleRender
            updateInputForm={updateInputForm}
            data={data}
            error={error}
          />
        );
      case "rich_text":
        return (
          <RichTextRender
            updateInputForm={updateInputForm}
            data={data}
            error={error}
          />
        );
      case "date":
        return (
          <DateRender
            updateInputForm={updateInputForm}
            data={data}
            error={error}
          />
        );
      case "select":
        return (
          <SelectionRender
            updateInputForm={updateInputForm}
            data={data}
            error={error}
          />
        );
      case "status":
        return (
          <SelectionRender
            updateInputForm={updateInputForm}
            data={data}
            error={error}
          />
        );
      case "multi_select":
        return (
          <MultiSelectRender
            updateInputForm={updateInputForm}
            data={data}
            error={error}
          />
        );
      case "checkbox":
        return (
          <CheckBoxRender
            updateInputForm={updateInputForm}
            data={data}
            error={error}
          />
        );
      case "files":
        if (dataUser?.is_subscribed)
          return (
            <FileRender
              updateInputForm={updateInputForm}
              data={data}
              error={error}
            />
          );
        else return <></>;
      case "radio_button":
        return (
          <RadioRender
            updateInputForm={updateInputForm}
            data={data}
            error={error}
          />
        );
      case "relation":
        return <></>;
      case "created_time":
        return <></>;
      case "people":
        return <></>;
      default:
        return (
          <TitleRender
            updateInputForm={updateInputForm}
            data={data}
            type={data.type}
            error={error}
          />
        );
    }
  };
  return <div className="w-full my-2 px-2">{renderCase()}</div>;
};

export default RenderFormComponent;
