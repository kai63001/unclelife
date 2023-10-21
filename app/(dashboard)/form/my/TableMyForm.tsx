"use client"
import { Icons } from "@/components/Icons";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import dayjs from "@/lib/dayjs";
import { date } from "zod";

export const TableMyForm = ({ form }: any) => {
  const renderDate = async (date: any) => {
    const newDate = new Date(date);
    return dayjs().to(newDate);
  };

  const renderFullDate = async (date:any) => {
    const newDate = new Date(date);
    return dayjs().format("DD/MM/YYYY HH:mm:ss");
  }

  const openNotion = (url: string) => {
    window.open(`https://notion.so/${url.replaceAll("-", "")}`, "_blank");
  };

  return (
    <TableRow>
      <TableCell className="font-bold cursor-pointer hover:underline">
        {form?.detail?.title || "Form"}
      </TableCell>
      <TableCell>
        <Icons.notion onClick={()=>openNotion(form.databaseId)} className="w-6 h-6 cursor-pointer"/>
      </TableCell>
      <TableCell className="group">
        <p className="group-hover:hidden">{renderDate(form?.created_at)}</p>
        <p className="hidden group-hover:block">{renderFullDate(form?.created_at)}</p>
      </TableCell>
      <TableCell className="text-right">asd</TableCell>
    </TableRow>
  );
};
