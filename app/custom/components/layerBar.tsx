"use client";

import React, { useEffect, useState } from "react";

import { SortableList } from "./layer";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import { setLayer } from "@/app/redux/slice/formController.slice";

const LayerBar = () => {
  const { form, tableOfDatabase, layer }: any = useAppSelector(
    (state) => state.formReducer
  );
  const dispatch = useAppDispatch();

  //hook for init
  useEffect(() => {
    console.log("tableOfDatabase change", tableOfDatabase);
    let newTable: any = [];
    // table of database is array of object
    Object.keys(tableOfDatabase).map((item, index): any => {
      console.log(item);
      newTable.push({
        id: index + 1,
        name: item,
        type: tableOfDatabase[item].type,
      });
    });

    console.log("newTable", newTable)

    dispatch(setLayer(newTable));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableOfDatabase]);

  const setLayerHook = (newLayer: any) => {
    dispatch(setLayer(newLayer));
  };


  return (
    <div className="text-[#3d3d3d] bg-[#FBFBFA] h-screen w-96 flex flex-col border-r px-3 ">
      <b className="mt-5 mb-5">LAYER</b>
      <SortableList
        items={layer}
        onChange={setLayerHook}
        renderItem={(item):any => (
          <SortableList.Item id={item.id}>
            {item.name}
            <SortableList.DragHandle />
          </SortableList.Item>
        )}
      />
    </div>
  );
};

export default LayerBar;
