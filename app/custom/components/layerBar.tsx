"use client";

import React, { useEffect, useState } from "react";

import { SortableList } from "./layer";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import {
  setLayer,
  setLayerWithId,
} from "@/app/redux/slice/formController.slice";
import { ScrollArea } from "@/components/ui/scroll-area";
import dynamic from "next/dynamic";
import ModalAddLayer from "./modal/addLayer";
import ProBadge from "@/app/custom/components/toolsbar/ProBadge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { debounce } from "lodash";

const SheetTab = dynamic(() => import("./sheet/SheetTab"), { ssr: false });

const LayerBar = () => {
  const { tableOfDatabase, layer, databaseId }: any = useAppSelector(
    (state) => state.formReducer
  );
  const dispatch = useAppDispatch();
  const [active, setActive] = useState(true);

  useEffect(() => {
    const updateWindowDimensions = debounce(() => {
      const innerWidth = window.innerWidth;
      if (innerWidth < 768) {
        setActive(false);
      } else {
        setActive(true);
      }
    }, 500);

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  //hook for init
  useEffect(() => {
    // console.log("tableOfDatabase change", tableOfDatabase);
    let newTable: any = [];
    // table of database is array of object
    Object.keys(tableOfDatabase).map((item, index): any => {
      newTable.push({
        id: index + 1,
        name: item,
        type: tableOfDatabase[item].type,
        options:
          tableOfDatabase[item][tableOfDatabase[item].type].options || [],
        label: item,
      });
    });

    //filter type not relation and created_time
    newTable = newTable?.filter(
      (item: any) =>
        item.type !== "relation" &&
        item.type !== "created_time" &&
        item.type !== "people"
    );

    //reverse
    newTable = newTable.reverse();
    // console.log("newTable", newTable);

    dispatch(setLayer(newTable));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableOfDatabase]);

  const setLayerHook = (newLayer: any) => {
    dispatch(setLayer(newLayer));
  };

  const renderFilterTypeWording = (type: string) => {
    switch (type) {
      case "rich_text":
        return "long";
      case "title":
        return "text";
      default:
        return type.replaceAll("_", " ");
    }
  };

  const checkTypeIsPro = (type: string) => {
    switch (type) {
      case "files":
        return true;
      case "textBlock":
        return true;
      case "dividerBlock":
        return true;
      case "nextPage":
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      {/* <div className="fixed bg-[#E51E0F] bottom-3 left-5 z-50 flex 2xl:hidden w-14 h-14 shadow-md rounded-full items-center justify-center text-white">
      <Pencil className="h-5 w-5" />
    </div>
    <div className="fixed bg-[#E51E0F] bottom-3 left-20 z-50 flex 2xl:hidden w-14 h-14 shadow-md rounded-full items-center justify-center text-white">
      <Layers className="h-5 w-5" />
    </div> */}
      {/* <div className="text-[#3d3d3d] h-full w-[230] md:w-[350px] fixed right-0 pb-5 pt-20 pr-5"> */}
      <div
        className={cn(
          "text-[#3d3d3d] w-[250px] md:w-[350px] md:right-0 fixed pr-5 pb-5 pt-20 pl-5 z-40",
          active
            ? "h-full w-full md:w-[350px]"
            : "h-16 bottom-14 md:top-10 w-[280px]"
        )}
      >
        <div
          className={cn(
            "flex flex-col px-5 shadow-me rounded-xl bg-background text-primary duration-300 pb-3",
            active ? "h-full" : "h-16"
          )}
        >
          <div className="flex items-center justify-between">
            <b className="mt-5 mb-5 hidden md:block">Structure</b>
            <b className="mt-5 mb-5 mr-5 block md:hidden">
              <Layers size={16} />
            </b>
            <div className="flex space-x-2 items-center">
              <ModalAddLayer />
              <Button
                onClick={() => {
                  setActive(!active);
                }}
                variant={"outline"}
                size={"icon"}
              >
                {active ? <Eye size={16} /> : <EyeOff size={16} />}
              </Button>
            </div>
          </div>
          <ScrollArea>
            <SortableList
              items={layer}
              onChange={setLayerHook}
              renderItem={(item: any) => (
                <SortableList.Item id={item.id} type={item.type}>
                  {item?.type == "nextPage" ? (
                    <div className="flex items-center space-x-3 min-h-[30px]">
                      <div className="flex flex-col">Next Page</div>
                      {checkTypeIsPro(item.type) && (
                        <div className="flex items-center space-x-1">
                          <ProBadge />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={cn("flex space-x-3 w-full min-h-[30px]", databaseId.length > 0 ? '' : 'group')}>
                      <div className="flex flex-col">
                        {item.block != true ? (
                          <div className=" cursor-pointer w-full">
                            <p
                              className="group-hover:hidden w-full"
                              dangerouslySetInnerHTML={{
                                __html: item?.label,
                              }}
                            ></p>
                            <input
                              className="hidden group-hover:block cursor-pointer hover:bg-red-200 w-full bg-red-200"
                              value={item?.name}
                              onChange={(e: any) => {
                                dispatch(
                                  setLayerWithId({
                                    id: item.id,
                                    value: {
                                      ...item,
                                      name: e.target.value,
                                    },
                                  })
                                );
                              }}
                            />
                          </div>
                        ) : (
                          <p>{item?.type.toUpperCase()}</p>
                        )}
                        <div className="flex items-center space-x-1">
                          <p className="text-xs text-[#9E9E9E] capitalize">
                            {renderFilterTypeWording(item.type)}
                          </p>
                          {item.block && (
                            <>
                              <p className="text-xs text-[#9E9E9E]">·</p>
                              <p className="text-xs text-[#9E9E9E]">Block</p>
                            </>
                          )}
                        </div>
                      </div>
                      {checkTypeIsPro(item.type) && (
                        <div className="flex items-center space-x-1">
                          <ProBadge />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex">
                    <SheetTab id={item.id} />
                    <SortableList.DragHandle />
                  </div>
                </SortableList.Item>
              )}
            />
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default LayerBar;
