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
  //get user id
  //get all forms with user id
  const supabase = createServerSupabaseClient(),
    { data: session } = await supabase.auth.getSession(),
    userId = session?.session?.user?.id,
    { data, error } = await supabase
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
      {/* <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
                {data?.map((form: any, index: number) => (
                    <CardMyForm key={index} form={form}/>
                ))}
            </div> */}
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
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
          {/* {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </>
  );
};

export default RenderMyForm;
