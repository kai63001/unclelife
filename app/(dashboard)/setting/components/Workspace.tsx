"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Trash } from "lucide-react";
import { Icons } from "@/components/Icons";
import { getAuthLink } from "@/lib/notionApi";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WorkspaceSetting = () => {
  const faqList = [
    {
      question: "Why do I need to connect my Notion workspace?",
      answer:
        "To seamlessly integrate and manage forms directly within your Notion environment, it's essential to connect your workspace.",
    },
    {
      question: "Is my data safe when I connect my workspace?",
      answer:
        "Absolutely. Your data remains within Notion, and we don't store any form submissions or personal information.",
    },
    {
      question: "Can I disconnect my workspace later?",
      answer:
        "Yes, you can disconnect your workspace at any time from the settings.",
    },
    {
      question:
        "What permissions will UncleLife.co have once I connect my workspace?",
      answer:
        "UncleLife.co will only have the permissions necessary to create and manage forms in the specified Notion pages. We won't access or modify any other data.",
    },
    {
      question:
        "Will other members of my workspace know I've connected to UncleLife.co?",
      answer:
        "No, the connection is specific to your account and won't be visible to other workspace members unless shared.",
    },
    {
      question: "Can I connect multiple workspaces?",
      answer:
        "Yes, you can connect multiple workspaces, but you'll need to be pro plan.",
    },
    {
      question: "I'm facing issues connecting my workspace. What should I do?",
      answer:
        "Ensure you have the necessary permissions in your Notion workspace. If the problem persists, please contact our support team.",
    },
    {
      question: "Do I need to connect my workspace every time I create a form?",
      answer:
        "No, once connected, your workspace remains linked unless you choose to disconnect.",
    },
    {
      question: "What happens if I modify my Notion page after connecting?",
      answer:
        "Any changes made in your Notion page will reflect in the forms you've created through UncleLife.co. Ensure to update your forms if necessary.",
    },
    {
      question: "Are there any costs associated with connecting my workspace?",
      answer:
        "Connecting your workspace is free. However, certain advanced features might come with a subscription cost.",
    },
    {
      question:
        "Why does Uncle Life need access to basic information about all workspace members and guest data?",
      answer:
        "Uncle Life requires this access to support features like the 'person field' in forms. However, we only access the necessary data for the feature's functionality and do not store or use this information for any other purpose. Your privacy and data security are our top priorities.",
    },
  ];

  const [listWorkspace, setListWorkspace] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const supabase = createClientComponentClient();

  useEffect(() => {
    const getWorkspace = async () => {
      const { data } = await supabase
        .from("integration_notion")
        .select("workspace_name, workspace_id, workspace_icon");
      setListWorkspace(data);
    };
    getWorkspace().then((r) => r);
  }, [supabase]);

  useEffect(() => {
    setInterval(() => {
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
          refreshWorkspace().then((r) => r);
        } else {
          toast({
            title: "Uh oh! Something went wrong.",
            description: notionIntegrationMessage,
            variant: "destructive",
            action: (
              <ToastAction
                onClick={() => {
                  router.push("/pricing");
                }}
                altText="Try again"
              >
                Upgrade
              </ToastAction>
            ),
          });
        }
      }
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addWorkspace = async () => {
    const url = await getAuthLink();
    const win = window.open(url, "_blank");
    win?.focus();
  };

  const refreshWorkspace = async () => {
    setLoading(true);
    setListWorkspace([]);
    const { data } = await supabase
      .from("integration_notion")
      .select("workspace_name, workspace_id, workspace_icon");
    setListWorkspace(data);
    setLoading(false);
  };

  const deleteWorkspace = async (workspaceId: string) => {
    await supabase
      .from("integration_notion")
      .delete()
      .match({ workspace_id: workspaceId });
    const { data } = await supabase
      .from("integration_notion")
      .select("workspace_name, workspace_id, workspace_icon");
    setListWorkspace(data);
  };

  return (
    <>
      <div className={"grid grid-cols-2 gap-3"}>
        {listWorkspace?.map((workspace: any, index: any) => (
          <div
            key={index}
            className={"border rounded-md px-10 py-5 grid grid-cols-5 gap-3"}
          >
            <div className={"col-span-1"}>
              <div
                className={
                  "w-20 h-20 mr-10 bg-gray-300 rounded-full overflow-hidden"
                }
              >
                <Avatar className={"w-20 h-20"}>
                  <AvatarImage
                    src={workspace.workspace_icon}
                    alt="workspace ICON"
                  />
                  <AvatarFallback>WS</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className={"col-span-4 pl-10 flex flex-col justify-between"}>
              <b>{workspace.workspace_name}</b>
              <div className={"flex"}>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className={"w-auto"}>
                      <Trash className={"mr-2 h-4 w-4"} />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your workspace and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          deleteWorkspace(workspace.workspace_id).then(
                            (r) => r
                          );
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={"flex justify-center mt-5"}>
        <Button onClick={addWorkspace} className={"w-72"}>
          <Icons.notion className={"mr-2 h-5 w-5"} />
          Connect a Workspace
        </Button>
        <Button onClick={refreshWorkspace} className={"ml-2"}>
          <RefreshCcw className={cn(loading && "animate-spin")} />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground text-center mt-2">
        You can reconnect the workspace to grant access once more to your Notion
        page.
      </p>

      <div className="border-t pt-5 mt-10">
        <Accordion type="multiple" className="w-full mt-5 mb-5">
          {faqList.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="w-full">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="w-full whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default WorkspaceSetting;
