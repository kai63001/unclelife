import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { addMoreLayer } from "@/app/redux/slice/formController.slice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  AlignJustify,
  AlignLeft,
  ArrowBigDown,
  AtSign,
  Calendar,
  CheckSquare,
  FormInput,
  Hash,
  ListChecks,
  Upload,
} from "lucide-react";
import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ProBadge from "@/app/custom/components/toolsbar/ProBadge";

const ModalAddLayer = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { layer, databaseId, workspaceId }: any = useAppSelector(
    (state) => state.formReducer
  );

  const typeOfLayerSelection = [
    {
      name: "Text",
      icon: <FormInput className="h-10 w-10" />,
      type: "title",
    },
    {
      name: "Long",
      icon: <AlignLeft className="h-10 w-10" />,
      type: "rich_text",
    },
    {
      name: "Email",
      icon: <AtSign className="h-10 w-10" />,
      type: "email",
    },
    {
      name: "Number",
      icon: <Hash className="h-10 w-10" />,
      type: "number",
    },
    {
      name: "Select",
      icon: <ArrowBigDown className="h-10 w-10" />,
      type: "select",
    },
    {
      name: "Multi Select",
      icon: <AlignJustify className="h-10 w-10" />,
      type: "multi_select",
    },
    {
      name: "Date",
      icon: <Calendar className="h-10 w-10" />,
      type: "date",
    },
    {
      name: "Checkbox",
      icon: <CheckSquare className="h-10 w-10" />,
      type: "checkbox",
    },
    {
      name: "Radio Button",
      icon: <ListChecks className="h-10 w-10" />,
      type: "radio_button",
    },
    {
      name: "File Upload",
      icon: <Upload className="h-10 w-10" />,
      type: "files",
      pro: true,
    },
  ];

  const randomTitleWithType = (type: string) => {
    let titles: string[];
    switch (type) {
      case "title":
        titles = [
          "Main Title",
          "Sub Title",
          "Article Title",
          "Header",
          "Footer",
        ];
        break;
      case "rich_text":
        titles = [
          "Long Text",
          "Description",
          "Detailed Information",
          "Additional Notes",
          "Extended Details",
        ];
        break;
      case "email":
        titles = [
          "Email Address",
          "Contact Email",
          "Business Email",
          "Personal Email",
          "Alternate Email",
        ];
        break;
      case "number":
        titles = ["Age", "Quantity", "Rank", "Score", "Height", "Weight"];
        break;
      case "select":
        titles = ["Option", "Choice", "Selection", "Pick", "Decision"];
        break;
      case "multi_select":
        titles = [
          "Multiple Choices",
          "Selections",
          "Options",
          "Preferences",
          "Picks",
        ];
        break;
      case "date":
        titles = [
          "Created Date",
          "Updated Date",
          "Accessed Date",
          "Modified Date",
          "Birth Date",
        ];
        break;
      case "checkbox":
        titles = [
          "Selection",
          "Confirmation",
          "Approval",
          "Acceptance",
          "Verification",
        ];
        break;
      case "file":
        titles = ["File Upload", "File", "Upload", "Document", "Attachment"];
        break;
      case "radio_button":
        titles = [
          "Radio",
          "Radio Button",
          "Radio Selection",
          "Radio Option",
          "Radio Choice",
        ];
        break;
      default:
        titles = ["Default Title"];
    }
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const addLayer = (type: string) => {
    const labelName = randomTitleWithType(type);
    let newLayer: any = {
      id: layer.length + 1,
      name: labelName,
      type: type,
      label: labelName,
    };
    if (
      type === "select" ||
      type === "multi_select" ||
      type === "radio_button"
    ) {
      newLayer = {
        ...newLayer,
        options: [
          {
            id: 1,
            name: "Option 1",
          },
          {
            id: 2,
            name: "Option 2",
          },
        ],
      };
    }
    dispatch(addMoreLayer(newLayer));
    //close modal
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(e) => {
          setOpen(e);
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline">Add Custom Block</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>Add Input Form</DialogTitle>
            <DialogDescription>
              Develop and Structure Data Collection Fields for a Notion-Based
              Form
            </DialogDescription>
          </DialogHeader>
          {!(!databaseId && workspaceId) && (
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Updating Form Structure & Fields!</AlertTitle>
              <AlertDescription>
                Use this to incorporate layout blocks into your forms. To
                introduce more fields, expand the columns in your Notion
                database. Ensure you select the appropriate type for your new
                database column in Notion
                {/*, and then refresh the form's layout.*/}
              </AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-4 gap-4 py-4">
            {typeOfLayerSelection.map((item: any, index) => (
              <div
                key={index}
                className={`border rounded-sm h-32 flex cursor-pointer hover:bg-primary hover:text-secondary`}
                onClick={() => {
                  addLayer(item.type);
                }}
              >
                <div className={`m-auto text-center`}>
                  <div className={`flex justify-center`}>{item.icon}</div>
                  <strong className="block">{item.name}</strong>
                  {item?.pro && <ProBadge />}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalAddLayer;
