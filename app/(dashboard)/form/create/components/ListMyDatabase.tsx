"use client";
import { getListDatabase } from "@/lib/notionApi";
// import CardDatabaseList from "@/app/(dashboard)/form/create/components/CardDatabaseList";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import ListMyDatabaseLoading from "@/app/(dashboard)/form/create/components/ListMyDatabaseLoading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CardDatabaseList = dynamic(
  () => import("@/app/(dashboard)/form/create/components/CardDatabaseList"),
  { ssr: false }
);
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const ListMyDatabase = ({ session }: any) => {
  const supabase = createClientComponentClient();

  const [listDatabase, setListDatabase] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [listWorkspace, setListWorkspace] = useState<any>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<any>("");

  useEffect(() => {
    const getListWorkspace = async () => {
      const listWorkspaceData = await supabase
        .from("integration_notion")
        .select("workspace_id,workspace_name")
        .eq("user_id", session?.session?.user?.id)
        .then((data) => {
          if (data.error) {
            return [];
          }
          return data.data;
        });
      setListWorkspace(listWorkspaceData);
      setSelectedWorkspace(listWorkspaceData[0]?.workspace_id);
    };
    getListWorkspace();
  }, [session?.session?.user?.id, supabase]);

  useEffect(() => {
    const getListData = async () => {
      setLoading(true);
      const listDatabase = await getListDatabase(
        selectedWorkspace
      )
        .then((data) => {
          setLoading(false);
          if (data.error) {
            return [];
          }
          return data;
        })
        .catch((error) => {
          console.log(error);
          return [];
        });
      setListDatabase(listDatabase);
    };
    if(listWorkspace.length > 0){
      getListData();
    }
  }, [listWorkspace, selectedWorkspace, session?.session?.user?.id]);

  const refreshListDatabase = async () => {
    setLoading(true);
    const listDatabase = await getListDatabase(
      selectedWorkspace
    )
      .then((data) => {
        setLoading(false);
        if (data.error) {
          return [];
        }
        return data;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
    setListDatabase(listDatabase);
  };

  return (
    <div className={"mt-4"}>
      <div className={"flex justify-between mb-3"}>
        <div>
          {/* search */}
          <Select
            key={listWorkspace}
            onValueChange={(value) => {
              setSelectedWorkspace(value);
            }}
            defaultValue={listWorkspace[0]?.workspace_id || ""}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select a Workspace" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Workspaces</SelectLabel>
                {listWorkspace.map((item: any, index: any) => (
                  <SelectItem key={index} value={item.workspace_id}>
                    {item.workspace_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className={"flex items-center space-x-3"}>
          <Button disabled={true} title={"Coming soon"}>
            Create Form with out Database
          </Button>
          <Button onClick={refreshListDatabase}>
            <RefreshCw className={`w-6 h-6 ${loading && "animate-spin"}`} />
          </Button>
        </div>
      </div>
      {loading ? (
        <ListMyDatabaseLoading />
      ) : (
        <div className={"grid grid-cols-3 gap-4"}>
          <CardDatabaseList listDatabase={listDatabase} selectedWorkspace={selectedWorkspace} />
        </div>
      )}
    </div>
  );
};

export default ListMyDatabase;
