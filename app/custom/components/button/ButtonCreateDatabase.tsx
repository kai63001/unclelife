"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { Button } from "@/components/ui/button";
import { addMapToLayer, convertLayerToProperty } from "@/lib/notion";
import { Newspaper, Send, SendIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { createNotionDatabase, getListPage } from "@/lib/notionApi";
import SearchPageComboBox from "./createDatabase/SearchPageComboBox";
import { insertForm, updateForm } from "@/lib/formApi";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { setInformation } from "@/app/redux/slice/formController.slice";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/Icons";

const ButtonCreateDatabase = ({ session }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [listPage, setListPage] = useState<any>([]);
  const [pageId, setPageId] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const { layer, infomation, form, workspaceId, logic, notification } = useAppSelector(
    (state) => state.formReducer
  );

  useEffect(() => {
    const getListPageCallback = async () => {
      const listPageData = await getListPage(workspaceId);
      console.log(listPageData);
      setListPage(listPageData);
    };
    getListPageCallback();
  }, [workspaceId]);

  const copyLink = (idData = infomation.id) => {
    // console.log("copy link");
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/form/${idData}`
    );
  };

  const createDatabase = async () => {
    setLoading(true);
    const property = convertLayerToProperty(layer);
    const newLayer = addMapToLayer(layer, property);
    const createNotion = await createNotionDatabase({
      title: form.title || "Untitled",
      pageId: pageId,
      properties: property,
      workspaceId: workspaceId,
    });
    const { databaseId } = createNotion;
    if (!databaseId) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      return;
    }

    //save to database
    if (infomation.id) {
      const { data, error } = await updateForm({
        id: infomation.id,
        detail: form,
        layer: newLayer,
        logic,
        notification
      });
      if (error) {
        console.log(error);
      }
      setLoading(false);
      setDialogOpen(false);
      toast({
        title: "Success",
        description: "Your form has been saved",
        action: (
          <ToastAction
            onClick={() => copyLink()}
            altText="Goto schedule to undo"
          >
            Copy Link
          </ToastAction>
        ),
      });
      return;
    }

    const newForm = {
      ...form,
      workspaceId: workspaceId,
    };

    const { data, error } = await insertForm({
      layer: newLayer,
      user_id: session?.user?.id || "",
      detail: newForm,
      databaseId,
      workspaceId,
      logic,
      notification
    });
    if (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error?.message?.toString(),
        variant: "destructive",
      });
      setLoading(false);
      setDialogOpen(false);
      return;
    }

    setLoading(false);
    setDialogOpen(false);
    dispatch(
      setInformation({
        id: data.id,
      })
    );

    //update a fake path
    router.replace(`/custom/form?id=${data.id}`);

    //toast success
    toast({
      title: "Success",
      description: "Your form has been saved",
      action: (
        <ToastAction
          onClick={() => copyLink(data.id)}
          altText="Goto schedule to undo"
        >
          Copy Link
        </ToastAction>
      ),
    });
  };

  return (
    <>
      <Dialog
        onOpenChange={(e) => {
          setDialogOpen(e);
        }}
        open={dialogOpen}
      >
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

          <SearchPageComboBox listPage={listPage} setPageId={setPageId} />
          <DialogFooter>
            <Button
              onClick={createDatabase}
              disabled={!pageId || pageId.length <= 0 || loading}
            >
              {loading && (
                <Icons.spinner className="animate-spin mr-2 h-5 w-5" />
              )}
              {!loading && <SendIcon size={24} className="mr-2" />}
              Publish Form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ButtonCreateDatabase;
