"use client";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "@/lib/dayjs";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { FileEdit, FileSymlink, Trash } from "lucide-react";
import { useAppDispatch } from "@/app/redux/hook";
import { clearAllData } from "@/app/redux/slice/formController.slice";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useSupabase } from "@/app/hook/supabase-provider";

const CardMyForm = ({ form }: any) => {
  const { supabase } = useSupabase();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [alertDelete, setAlertDelete] = useState(false);

  const renderDate = async (date: any) => {
    const newDate = new Date(date);
    return dayjs().to(newDate);
  };

  const openNotion = (url: string) => {
    window.open(`https://notion.so/${url.replaceAll("-", "")}`, "_blank");
  };

  const openForm = (e: any, url: string) => {
    e.stopPropagation();
    //clear
    dispatch(clearAllData());
    router.push(`/custom/form?id=${url}`);
  };

  const deleteForm = (id: string) => {
    // deleteForm with supabase
    supabase
      .from("form")
      .delete()
      .eq("id", id)
      .then((res) => {
        console.log(res);
      });
    //refresh
    window.location.reload();
  };

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{form?.detail?.title || "Form"}</CardTitle>
        <CardDescription>{renderDate(form?.created_at)}</CardDescription>
      </CardHeader>
      <CardFooter className={"space-x-1 flex justify-between items-center"}>
        <div className={"flex space-x-2"}>
          <Button variant={"outline"} onClick={(e) => openForm(e, form.id)}>
            <FileEdit className={"w-6 h-6"} />
          </Button>
          {/*<Button variant={'outline'} onClick={(e) => openNotion(e, form.databaseId)}>*/}
          {/*    <Icons.notion className={'w-6 h-6'}/>*/}
          {/*</Button>*/}
          <Button variant={"outline"} asChild>
            <Link href={`/public/form/${form.id}`} target={"_blank"}>
              <FileSymlink className={"w-6 h-6"} />
            </Link>
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <Icons.dotdotdot className={"w-4 h-4 fill-primary"} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={""}>
            <DropdownMenuItem
              className={"cursor-pointer"}
              onClick={() => openNotion(form.databaseId)}
            >
              <Icons.notion className={"w-4 h-4 mr-2"} />
              Open Notion
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={"cursor-pointer"}
              onClick={() => {
                setAlertDelete(true);
              }}
            >
              <Trash className={"w-4 h-4 mr-2"} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
      <AlertDialog open={alertDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              form.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setAlertDelete(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteForm(form.id);
                setAlertDelete(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default CardMyForm;
