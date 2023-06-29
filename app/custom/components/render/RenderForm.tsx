import dynamic from "next/dynamic";

const TitleRendert = dynamic(() => import("./Title/TitleRender"), {
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



const RenderFormComponent = ({ data }: any) => {
  const renderCase = () => {
    //return SwitchCase
    switch (data.type) {
      case "title":
        return <TitleRendert data={data} />;
      case "rich_text":
        return <RichTextRender data={data}/>;
      case "date":
        return <DateRender data={data}/>;
      case "select":
        return <SelectionRender data={data}/>;
      default:
        return <TitleRendert data={data} type={data.type} />;
    }
  };
  return <div>{renderCase()}</div>;
};

export default RenderFormComponent;
