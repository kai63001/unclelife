"use client";

import { convertListToTable } from "@/lib/notion";
import { getListNotionDatabase } from "@/lib/notionApi";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ListSubmition = ({ databaseId, id }: any) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetch = async () => {
      const { list } = await getListNotionDatabase(id, databaseId);
      const converted = convertListToTable(list);
      console.log(converted);
      setData(converted);
    };
    fetch();
  }, [databaseId, id]);

  return (
    <Table className="mt-10">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          {data.length > 0 &&
            Object.keys(data[0]).map((key) => (
              <TableHead key={key}>{key}</TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row: any, index: number) => (
          <TableRow key={index}>
            {Object.values(row).map((column: any, index: number) => (
              <TableCell key={index}>{column?.value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
