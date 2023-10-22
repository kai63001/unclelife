"use client";
import { Icons } from "@/components/Icons";
import { TableCell, TableRow } from "@/components/ui/table";
import dayjs from "@/lib/dayjs";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, FileSymlink, MoreVertical, Trash } from "lucide-react";
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
import { useAppDispatch } from "@/app/redux/hook";
import { clearAllData } from "@/app/redux/slice/formController.slice";
import { useRouter } from "next/navigation";

export const TableMyForm = ({ form }: any) => {
  const { supabase } = useSupabase();
  const [alertDelete, setAlertDelete] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const renderDate = (date: any) => {
    const newDate = new Date(date);
    return dayjs().to(newDate);
  };

  const renderFullDate = (date: any) => {
    const newDate = new Date(date);
    return dayjs().format("DD/MM/YYYY HH:mm:ss");
  };

  const openNotion = (url: string) => {
    window.open(`https://notion.so/${url.replaceAll("-", "")}`, "_blank");
  };

  const openForm = (e: any, url: string) => {
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
    <>
      <TableRow>
        <TableCell className="font-bold">
          <Link href={`/form/detail/${form?.id}`} className="w-full hover:underline">
            {form?.detail?.title || "Form"}
          </Link>
        </TableCell>
        <TableCell>
          <Icons.notion
            onClick={() => openNotion(form.databaseId)}
            className="w-6 h-6 cursor-pointer"
          />
        </TableCell>
        <TableCell className="group">
          <p className="group-hover:hidden">{renderDate(form?.created_at)}</p>
          <p className="hidden group-hover:block">
            {renderFullDate(form?.created_at)}
          </p>
        </TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <MoreVertical className={"w-4 h-4 fill-primary"} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={""}>
              <DropdownMenuItem
                className={"cursor-pointer"}
                onClick={(e) => openForm(e, form.id)}
                asChild
              >
                <Link href={`/public/form/${form.id}`} target={"_blank"}>
                  <FileSymlink className={"w-4 h-4 mr-2"} />
                  Open Form
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={"cursor-pointer"}
                onClick={(e) => openForm(e, form.id)}
              >
                <Edit className={"w-4 h-4 mr-2"} />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={"cursor-pointer"}
                onClick={(e: any) => {
                  e.preventDefault();
                  setAlertDelete(true);
                }}
              >
                <Trash className={"w-4 h-4 mr-2"} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
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
    </>
  );
};
