"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { Button } from "@/components/ui/button";
import { convertLayerToProperty } from "@/lib/notion";
import { Newspaper, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { getListPage } from "@/lib/notionApi";
import SearchPageComboBox from "./createDatabase/SearchPageComboBox";

const ButtonCreateDatabase = () => {
  const dispatch = useAppDispatch();
  const [listPage, setListPage] = useState<any>([]);
  const [pageId, setPageId] = useState<any>("");
  const { layer, infomation, form, workspaceId } = useAppSelector(
    (state) => state.formReducer
  );

  useEffect(() => {
    const getListPageCallback = async () => {
      const listPageData = await getListPage(workspaceId);
      console.log(listPageData)
      setListPage(listPageData);
    };
    getListPageCallback();
  }, [workspaceId]);

  const createDatabase = () => {
    console.log(layer);
    const property = convertLayerToProperty(layer);
    console.log(property);
  };

  

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Send size={24} className="mr-2" />
            Publish form
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[700px]">
          <Newspaper className="mx-auto mt-4" size={128} />
          <h2 className="text-center text-2xl font-bold">
            Select a Notion page
          </h2>
          <p>
            {`Choose a page within your Notion Workspace. We'll set up a Notion database there, where all your form responses will be collected.`}
          </p>

          <SearchPageComboBox listPage={listPage} setPageId={setPageId}/>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ButtonCreateDatabase;
