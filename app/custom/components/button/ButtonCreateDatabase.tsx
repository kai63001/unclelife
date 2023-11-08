"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { Button } from "@/components/ui/button";
import { addMapToLayer, convertLayerToProperty } from "@/lib/notion";
import { Briefcase, Newspaper, Send, SendIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import {
  createNotionDatabase,
  getAuthLink,
  getListPage,
} from "@/lib/notionApi";
import SearchPageComboBox from "./createDatabase/SearchPageComboBox";
import { insertForm, updateForm } from "@/lib/formApi";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { setInformation } from "@/app/redux/slice/formController.slice";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/Icons";
import { useSupabase } from "@/app/hook/supabase-provider";
import SelectWorkspace from "./createDatabase/SelectWorkspace";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

const ButtonCreateDatabase = ({ session }: any) => {
  const dispatch = useAppDispatch();
  const { supabase } = useSupabase();
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [listPage, setListPage] = useState<any>([]);
  const [pageId, setPageId] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const { layer, infomation, form, workspaceId, logic, notification } =
    useAppSelector((state) => state.formReducer);

  const [workspaceList, setWorkspaceList] = useState<any>([]);
  const [loadingWorkspace, setLoadingWorkspace] = useState(false);
  const [noWorkspace, setNoWorkspace] = useState(false);
  const [addWorkspace, setAddWorkspace] = useState(false);

  useEffect(() => {
    const getListPageCallback = async () => {
      setLoadingWorkspace(true);
      const listPageData = await getListPage(workspaceId);
      setListPage(listPageData);
      setLoadingWorkspace(false);
    };
    getListPageCallback();
  }, [workspaceId]);

  const copyLink = (idData = infomation.id) => {
    // console.log("copy link");
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/form/${idData}`
    );
  };

  useEffect(() => {
    const getListWorkspace = async () => {
      setNoWorkspace(false);
      if (workspaceId) {
        return;
      }
      const listWorkspaceData = await supabase
        .from("integration_notion")
        .select("workspace_id,workspace_name")
        .eq("user_id", session?.user?.id)
        .then((data) => {
          if (data.error) {
            return [];
          }
          return data.data;
        });
      setWorkspaceList(listWorkspaceData);
      if (listWorkspaceData.length == 0) {
        setNoWorkspace(true);
      }
    };
    getListWorkspace();
  }, [session?.user?.id, supabase, workspaceId, addWorkspace]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (noWorkspace) {
      intervalId = setInterval(() => {
        const notionIntegrationMessage = localStorage.getItem(
          "notion_integration_message"
        );
        if (
          notionIntegrationMessage &&
          notionIntegrationMessage !== "" &&
          notionIntegrationMessage != null &&
          notionIntegrationMessage != undefined
        ) {
          localStorage.removeItem("notion_integration_message");
          if (notionIntegrationMessage === "success") {
            setAddWorkspace(true);
            clearInterval(intervalId);
          } else {
            toast({
              title: "Uh oh! Something went wrong.",
              description: notionIntegrationMessage,
              variant: "destructive",
            });
          }
        }
      }, 2000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [noWorkspace]);

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
        notification,
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
      notification,
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
    // router.replace(`/custom/form?id=${data.id}`);

    //push to detail page
    router.replace(`/form/detail/${data.id}`);

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

  if (noWorkspace && dialogOpen) {
    return (
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold">
              Connect your Notion Workspace
            </AlertDialogTitle>
            <AlertDialogDescription>
              {`Link your Notion workspace and begin gathering responses. Ensure you choose at least one Notion page.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center sm:justify-center mt-10">
            <AlertDialogAction
              onClick={async () => {
                const url = await getAuthLink();
                const win = window.open(url, "_blank");
                win?.focus();
              }}
              className="animate-bounce"
            >
              <Icons.notion className={"w-6 h-6 mr-2"} />
              Connect a workspace
            </AlertDialogAction>
          </AlertDialogFooter>
          <div className="text-xs border bg-muted px-3 py-3">
            {`Your information remains in Notion. We don't keep any form responses.`}
          </div>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

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
        {workspaceId ? (
          <DialogContent className="min-w-[700px]">
            <Newspaper className="mx-auto mt-4" size={128} />
            <h2 className="text-center text-2xl font-bold">
              Select a Notion page
            </h2>
            <p>
              {`Choose a page within your Notion Workspace. We'll set up a Notion database there, where all your form responses will be collected.`}
            </p>
            {loadingWorkspace && (
              <div className="flex justify-center">
                <Icons.spinner className="animate-spin mr-2 h-5 w-5" />
                loading...
              </div>
            )}
            {listPage.length > 0 && (
              <SearchPageComboBox listPage={listPage} setPageId={setPageId} />
            )}
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
        ) : (
          <DialogContent className="min-w-[700px]">
            <Briefcase className="mx-auto mt-4" size={128} />
            <h2 className="text-center text-2xl font-bold">
              Select a Workspace
            </h2>
            <p>
              {`Before selecting a page, you need to choose a workspace in Notion. Once a workspace is selected, we can then establish a database to organize all your form responses.`}
            </p>
            <SelectWorkspace listWorkspace={workspaceList} />
            <DialogFooter>
              <Button
                onClick={createDatabase}
                disabled={!pageId || pageId.length <= 0 || loading}
              >
                Select Workspace
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default ButtonCreateDatabase;
