import { useAppDispatch } from "@/app/redux/hook";
import { addMoreLayer } from "@/app/redux/slice/formController.slice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const ModalAddLayer = () => {
  const [open, setOpen] = useState(false);
  const [layer, setLayer] = useState<any>({
    label: "Title",
    name: "title",
    type: "",
  });

  const handleChangeLayer = (e: any) => {
    setLayer({
      ...layer,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useAppDispatch();
  const typeOfLayerSelection = [
    {
      id: "title",
      name: "Title",
    },
    {
      id: "rich_text",
      name: "Rich Text",
    },
    {
      id: "number",
      name: "Number",
    },
    {
      id: "select",
      name: "Select",
    },
    {
      id: "checkbox",
      name: "Checkbox",
    },
    {
      id: "status",
      name: "Status",
    },
    {
      id: "multi_select",
      name: "Multi Select",
    },
    {
      id: "date",
      name: "Date",
    },
    {
      id: "phone_number",
      name: "Phone Number",
    },
    {
      id: "email",
      name: "Email",
    },
    {
      id: "url",
      name: "URL",
    },
  ];

  const saveLayer = () => {
    console.log(layer);
    console.log("saveLayer");
    dispatch(addMoreLayer(layer));
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
          <Button variant="outline">Add Layer</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Input Form</DialogTitle>
            <DialogDescription>
              Develop and Structure Data Collection Fields for a Notion-Based
              Form
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="label" className="text-right">
                Label
              </Label>
              <Input
                onChange={(e) => {
                  handleChangeLayer(e);
                }}
                id="label"
                name="label"
                value={
                  layer.label === "Title" ? "Title" : layer.label || "Title"
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                onChange={(e) => {
                  handleChangeLayer(e);
                }}
                id="name"
                name="name"
                value={layer.name === "title" ? "title" : layer.name || "title"}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="selectionType" className="text-right">
                Type
              </Label>
              <Select
                onValueChange={(e) => {
                  setLayer({
                    ...layer,
                    type: e,
                  });
                }}
              >
                <SelectTrigger id="selectionType" className="w-full col-span-3">
                  <SelectValue placeholder="Select a Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {typeOfLayerSelection.map((item, index) => (
                      <SelectItem key={index} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                    <SelectLabel>Pro Feature</SelectLabel>
                    <SelectItem disabled={true} value="pineapple">
                      File
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveLayer} type="submit">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalAddLayer;
