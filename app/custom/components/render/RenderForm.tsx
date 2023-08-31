import dynamic from "next/dynamic";
import MultiSelectRender from "./MultiSelect/MultiSelectRender";
import CheckBoxRender from "./CheckBox/CheckBoxRender";
import FileRender from "@/app/custom/components/render/File/FileRender";

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

const RenderFormComponent = ({data, updateInputForm, dataUser}: any) => {
    const renderCase = () => {
        //return SwitchCase
        switch (data.type) {
            case "title":
                return <TitleRender updateInputForm={updateInputForm} data={data}/>;
            case "rich_text":
                return <RichTextRender updateInputForm={updateInputForm} data={data}/>;
            case "date":
                return <DateRender updateInputForm={updateInputForm} data={data}/>;
            case "select":
                return (
                    <SelectionRender updateInputForm={updateInputForm} data={data}/>
                );
            case "status":
                return (
                    <SelectionRender updateInputForm={updateInputForm} data={data}/>
                );
            case "multi_select":
                return (
                    <MultiSelectRender updateInputForm={updateInputForm} data={data}/>
                );
            case "checkbox":
                return <CheckBoxRender updateInputForm={updateInputForm} data={data}/>;
            case "files":
                if (dataUser?.is_subscribed)
                    return <FileRender updateInputForm={updateInputForm} data={data}/>;
                else
                    return (<></>)
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
                    />
                );
        }
    };
    return <div>{renderCase()}</div>;
};

export default RenderFormComponent;
