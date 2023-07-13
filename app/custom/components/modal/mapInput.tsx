"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
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
import { getDatabase } from "@/lib/notionApi";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/Icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setMapFromLayerWithId } from "@/app/redux/slice/formController.slice";

const ModalMapInput = () => {
  const [open, setOpen] = useState(false);
  const [listObjectTable, setListObjectTable] = useState<any>({});
  const dispatch = useAppDispatch();
  const { databaseId, layer, tableOfDatabase } = useAppSelector(
    (state) => state.formReducer
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      getDatabaseList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const getDatabaseList = async () => {
    setLoading(true);
    try {
      const databaseList = await getDatabase(databaseId);
      console.log("databaseList :", databaseList);
      setListObjectTable(databaseList);
      if (databaseList?.error) {
        setListObjectTable(tableOfDatabase);
      }
      setLoading(false);
    } catch (error) {
      console.log("error :", error);
    }
  };

  const renderSelection = () => {
    const list = Object.keys(listObjectTable);
    return list.reverse().map((item: any, index: number) => (
      <SelectItem key={index} value={item}>
        {listObjectTable[item].name} ({listObjectTable[item].type})
      </SelectItem>
    ));
  };

  const onMapChange = (e: any, id: any) => {
    console.log(e, id);
    const type = listObjectTable[e].type;
    dispatch(setMapFromLayerWithId({ id, mapTo: e, mapType: type }));
  };

  return (
    <Dialog
      onOpenChange={() => {
        setOpen(!open);
      }}
      open={open}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="h-full px-10 py-3 font-medium">
          <ArrowLeftRight className="h-4 w-4 mr-3" />
          Map Input
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            Map Layer Input <ArrowRight className="h-4 w-6" /> Notion Database{" "}
          </DialogTitle>
          <DialogDescription>
            Map Input Fields to Notion Database Properties
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px]">
          <div className="flex flex-col space-y-3 py-4 px-10 ">
            {/* loop layer map listObejectTable */}
            {layer.map((item: any, index: number) => (
              <div key={index} className="grid grid-cols-5 items-center gap-4">
                <Input
                  className="w-full col-span-2"
                  disabled
                  value={`${item.label} (${item.type})`}
                />
                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-10" />
                </div>
                {loading ? (
                  <div>
                    <Icons.spinner className="animate-spin mr-2 h-5 w-5" />
                  </div>
                ) : (
                  <Select
                    onValueChange={(e) => {
                      onMapChange(e, item.id);
                    }}
                    defaultValue={item.mapTo}
                  >
                    <SelectTrigger className="w-full col-span-2">
                      <SelectValue placeholder="Select Column" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>{renderSelection()}</SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalMapInput;
