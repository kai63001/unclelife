"use client";

import React, { useEffect } from "react";

import { SortableList } from "./layer";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import { setLayer } from "@/app/redux/slice/formController.slice";
import { ScrollArea } from "@/components/ui/scroll-area";
import dynamic from "next/dynamic";
import ModalAddLayer from "./modal/addLayer";
import ProBadge from "@/app/custom/components/toolsbar/ProBadge";

const SheetTab = dynamic(() => import("./sheet/SheetTab"), { ssr: false });

const LayerBar = () => {
  const { tableOfDatabase, layer }: any = useAppSelector(
    (state) => state.formReducer
  );
  const dispatch = useAppDispatch();

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
    newTable = newTable.filter(
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
      default:
        return false;
    }
  };

  return (
    <div className="text-[#3d3d3d] h-screen w-96 fixed right-0 pb-5 pt-20 pr-5">
      <div className="flex flex-col px-5 shadow-me h-full rounded-lg bg-background text-primary">
        <div className="flex items-center justify-between">
          <b className="mt-5 mb-5 uppercase">Structure</b>
          <ModalAddLayer />
        </div>
        <ScrollArea>
          <SortableList
            items={layer}
            onChange={setLayerHook}
            renderItem={(item: any) => (
              <SortableList.Item id={item.id}>
                <div className="flex space-x-3 min-h-[30px]">
                  <div className="flex flex-col">
                    {item.block != true ? (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item?.label,
                        }}
                      ></p>
                    ) : (
                      <p>{item?.type.toUpperCase()}</p>
                    )}
                    <div className="flex items-center space-x-1">
                      {/*<p className="text-xs text-[#9E9E9E]">{item.name}</p>*/}
                      {/*<p className="text-xs text-[#9E9E9E]">·</p>*/}
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
  );
};

export default LayerBar;
