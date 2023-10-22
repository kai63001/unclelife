import { createServerSupabaseClient } from "@/app/hook/supabase-server";
// import CardMyForm from "@/app/(dashboard)/form/my/CardMyForm";
import dynamic from "next/dynamic";
const CardMyForm = dynamic(
  () => import("@/app/(dashboard)/form/my/CardMyForm"),
  { ssr: false }
);
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableMyForm } from "./TableMyForm";

export const revalidate = 60;
const RenderMyForm = async ({ limit = 1000 }: { limit?: number }) => {
  const supabase = createServerSupabaseClient();
  const { data: session } = await supabase.auth.getSession();
  const userId = session?.session?.user?.id;
  const { data, error } = await supabase
    .from("form")
    .select("id,detail,databaseId,created_at")
    .eq("user_id", userId)
    .limit(limit)
    .order("created_at", { ascending: false });
  if (error) {
    console.log(error);
  }

  return (
    <>
      {limit != 1000 && (
        <h2 className={"text-2xl font-bold mb-2"}>Recent Forms</h2>
      )}
      <Table>
        <TableCaption>
          {limit == 1000 ? "All Forms" : "Recent Forms"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>Integration</TableHead>
            <TableHead className="w-[220px]">Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((form: any, index: number) => (
            <TableMyForm key={index} form={form} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default RenderMyForm;
