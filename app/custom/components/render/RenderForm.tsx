import dynamic from "next/dynamic";
import MultiSelectRender from "./MultiSelect/MultiSelectRender";
import CheckBoxRender from "./CheckBox/CheckBoxRender";
import FileRender from "@/app/custom/components/render/File/FileRender";
import RadioRender from "@/app/custom/components/render/Radio/RadioRender";
import { cn } from "@/lib/utils";
import TextBlockRender from "./Layout/TextBlock/TextBlockRender";
import { DividerRenderBlock } from "./Layout/DividerBlock/DividerBlockRender";

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
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "rich_text":
        return (
          <RichTextRender
            updateInputForm={updateInputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "date":
        return (
          <DateRender
            updateInputForm={updateInputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "select":
        return (
          <SelectionRender
            updateInputForm={updateInputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "status":
        return (
          <SelectionRender
            updateInputForm={updateInputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "multi_select":
        return (
          <MultiSelectRender
            updateInputForm={updateInputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "checkbox":
        return (
          <CheckBoxRender
            updateInputForm={updateInputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "files":
        if (dataUser?.is_subscribed)
          return (
            <FileRender
              updateInputForm={updateInputForm}
              isSubscribed={dataUser?.is_subscribed}
              data={data}
              error={error}
            />
          );
        else return <></>;
      case "radio_button":
        return (
          <RadioRender
            updateInputForm={updateInputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "textBlock":
        return (
          <TextBlockRender
            updateInputForm={updateInputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "dividerBlock":
        return (
          <DividerRenderBlock
            updateInputForm={updateInputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "formula":
        return <></>;
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
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            type={data.type}
            error={error}
          />
        );
    }
  };
  return (
    <div
      className={cn(
        "px-2",
        data?.pro?.layout && dataUser?.is_subscribed
          ? data?.pro?.layout
          : "w-full"
      )}
    >
      {renderCase()}
    </div>
  );
};

export default RenderFormComponent;
