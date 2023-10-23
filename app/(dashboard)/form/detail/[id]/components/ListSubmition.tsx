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
import { useSupabase } from "@/app/hook/supabase-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const ListSubmition = ({ databaseId, id }: any) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const { user } = useSupabase();

  useEffect(() => {
    const fetch = async () => {
      const { list, nextCursor } = await getListNotionDatabase(
        id,
        databaseId,
        null
      );
      const converted = convertListToTable(list);
      setNextCursor(nextCursor);
      setData(converted);
    };
    fetch();
  }, [databaseId, id]);

  const handleLoadMore = async () => {
    if (nextCursor) {
      setLoading(true);
      const { list, nextCursor: newNextCursor } = await getListNotionDatabase(
        id,
        databaseId,
        nextCursor
      );
      const converted = convertListToTable(list);
      setNextCursor(newNextCursor);
      setData((prevData: any) => [...prevData, ...converted]);
      setLoading(false);
    }
  };

  return (
    <>
      <Table className="mt-10">
        <TableCaption>
          {user?.is_subscribed ? (
            ""
          ) : (
            <div>
              You can only see 10 submition. Upgrade to{" "}
              <Link className="text-red-400 hover:underline" href="/pricing">
                Pro
              </Link>{" "}
              to see all submition.
            </div>
          )}
        </TableCaption>
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
      {nextCursor && user.is_subscribed && (
        <Button
          loading={loading}
          className="-mt-4 px-10 w-full border-0 rounded-none"
          variant={"ghost"}
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
    </>
  );
};
