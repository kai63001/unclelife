"use client";

import React, { useState } from "react";

import { SortableList } from "./layer";

const LayerBar = () => {
  const [items, setItems] = useState([
    {
      id: "1",
    },
    {
      id: "2",
    },
  ]);
  return (
    <div className="text-[#3d3d3d] bg-[#FBFBFA] h-screen w-96 flex flex-col border-r px-3 ">
      <SortableList
        items={items}
        onChange={setItems}
        renderItem={(item) => (
          <SortableList.Item id={item.id}>
            {item.id}
            <SortableList.DragHandle />
          </SortableList.Item>
        )}
      />
    </div>
  );
};

export default LayerBar;
