import { Button } from "@/components/ui/button";
import dayjs from "@/lib/dayjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ExternalLink, MoreVertical, Trash } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

import { MoreDetailDropDown } from "./components/MoreDetailDropDown";
import { ShareURLDetailForm } from "./components/ShareURL";
import { ListSubmition } from "./components/ListSubmition";

const FormDetailPage = async ({ params: { id } }: any) => {
  const supabase = createServerComponentClient({ cookies });
  const { data: session } = await supabase.auth.getSession();
  const userId = session?.session?.user?.id;
  const { data, error } = await supabase
    .from("form")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  const renderDate = (date: any) => {
    const newDate = new Date(date);
    return dayjs().to(newDate);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">{data?.detail?.title}</h1>
          <span className="text-xs text-muted-foreground">
            Created: {renderDate(data?.created_at)}
          </span>
        </div>
        <div className="flex space-x-2">
          <Button variant={"outline"} asChild>
            <Link href={`/public/form/${id}`} target={"_blank"}>
              <ExternalLink className="w-6 h-6 mr-2" />
              Open Form
            </Link>
          </Button>
          <MoreDetailDropDown id={id} />
        </div>
      </div>
      <div>
        <ShareURLDetailForm id={id} />
        <ListSubmition id={id} databaseId={data?.databaseId} />
      </div>
    </div>
  );
};

export default FormDetailPage;
