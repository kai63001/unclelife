import dynamic from "next/dynamic";
// import MultiSelectRender from "./MultiSelect/MultiSelectRender";
// import CheckBoxRender from "./CheckBox/CheckBoxRender";
// import FileRender from "@/app/custom/components/render/File/FileRender";
// import RadioRender from "@/app/custom/components/render/Radio/RadioRender";
import { cn } from "@/lib/utils";
// import TextBlockRender from "./Layout/TextBlock/TextBlockRender";
import { DividerRenderBlock } from "./Layout/DividerBlock/DividerBlockRender";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
// import PhoneRender from "./Phone/PhoneRender";

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
const MultiSelectRender = dynamic(
  () => import("./MultiSelect/MultiSelectRender"),
  {
    ssr: false,
  }
);
const CheckBoxRender = dynamic(() => import("./CheckBox/CheckBoxRender"), {
  ssr: false,
});
const FileRender = dynamic(() => import("./File/FileRender"), {
  ssr: false,
});
const RadioRender = dynamic(() => import("./Radio/RadioRender"), {
  ssr: false,
});
const PhoneRender = dynamic(() => import("./Phone/PhoneRender"), {
  ssr: false,
});
const TextBlockRender = dynamic(
  () => import("./Layout/TextBlock/TextBlockRender"),
  {
    ssr: false,
  }
);

const RenderFormComponent = ({
  data,
  inputForm,
  updateInputForm,
  dataUser,
  error,
}: any) => {

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowDimensions = debounce(() => {
      const innerWidth = window.innerWidth;

      setWidth(innerWidth);
    }, 500);

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const renderCase = () => {
    //return SwitchCase
    switch (data.type) {
      case "title":
        return (
          <TitleRender
            updateInputForm={updateInputForm}
            inputForm={inputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "rich_text":
        return (
          <RichTextRender
            updateInputForm={updateInputForm}
            inputForm={inputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "date":
        return (
          <DateRender
            updateInputForm={updateInputForm}
            inputForm={inputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "select":
        return (
          <SelectionRender
            updateInputForm={updateInputForm}
            inputForm={inputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "status":
        return (
          <SelectionRender
            updateInputForm={updateInputForm}
            inputForm={inputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "multi_select":
        return (
          <MultiSelectRender
            updateInputForm={updateInputForm}
            inputForm={inputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "checkbox":
        return (
          <CheckBoxRender
            updateInputForm={updateInputForm}
            inputForm={inputForm}
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
              inputForm={inputForm}
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
            inputForm={inputForm}
            isSubscribed={dataUser?.is_subscribed}
            data={data}
            error={error}
          />
        );
      case "phone_number":
        return (
          <PhoneRender
            updateInputForm={updateInputForm}
            inputForm={inputForm}
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
      case "nextPage":
        return <></>;
      default:
        return (
          <TitleRender
            updateInputForm={updateInputForm}
            inputForm={inputForm}
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
          ? `${width > 376 ? data?.pro?.layout: 'w-full'}`
          : "w-full"
      )}
    >
      {renderCase()}
    </div>
  );
};

export default RenderFormComponent;
