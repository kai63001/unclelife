"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { Button } from "@/components/ui/button";
import { convertLayerToProperty } from "@/lib/notion";
import { Send } from "lucide-react";

const ButtonCreateDatabase = () => {
  const dispatch = useAppDispatch();
  const { layer, infomation, form, workspaceId } = useAppSelector(
    (state) => state.formReducer
  );

  const createDatabase = () => {
    console.log(layer)
    const property = convertLayerToProperty(layer);
    console.log(property)
  };

  return (
    <Button onClick={createDatabase}>
      <Send size={24} className="mr-2" />
      Publish form
    </Button>
  );
};

export default ButtonCreateDatabase;
