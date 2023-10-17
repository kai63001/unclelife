"use client";
import { getListDatabase } from "@/lib/notionApi";
// import CardDatabaseList from "@/app/(dashboard)/form/create/components/CardDatabaseList";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Newspaper, RefreshCw } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Icons } from "@/components/Icons";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const CardDatabaseList = dynamic(
  () => import("@/app/(dashboard)/form/create/components/CardDatabaseList"),
  { ssr: false }
);
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAppDispatch } from "@/app/redux/hook";
import {
  clearAllData,
  setWorkspaceId,
} from "@/app/redux/slice/formController.slice";
import { Skeleton } from "@/components/ui/skeleton";

const ListMyDatabase = ({ session }: any) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [listDatabase, setListDatabase] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [listWorkspace, setListWorkspace] = useState<any>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<any>("");

  useEffect(() => {
    const getListWorkspace = async () => {
      setLoading(true);
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
      setLoading(false);
      setListWorkspace(listWorkspaceData);
      if (listWorkspaceData.length > 0) {
        setSelectedWorkspace(listWorkspaceData[0]?.workspace_id);
      }
    };
    getListWorkspace();
  }, [session?.session?.user?.id, supabase]);

  const createFormWithoutDatabase = () => {
    //clear first
    dispatch(clearAllData());

    dispatch(setWorkspaceId(selectedWorkspace));
    router.push("/custom/form");
  };

  const checkListWorkspace = () => {
    if (listWorkspace.length === 0 && !loading) {
      return (
        <AlertDialog open={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold">
                Connect your Notion Workspace
              </AlertDialogTitle>
              <AlertDialogDescription>
                {`Link your Notion workspace and begin gathering responses. Ensure you choose at least one Notion page.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-center sm:justify-center mt-10">
              <AlertDialogAction
                className="animate-bounce"
                onClick={() => {
                  router.push("/setting?tab=workspaces");
                }}
              >
                <Icons.notion className={"w-6 h-6 mr-2"} />
                Connect a workspace
              </AlertDialogAction>
            </AlertDialogFooter>
            <div className="text-xs border bg-muted px-3 py-3">
              {`Your information remains in Notion. We don't keep any form responses.`}
            </div>
          </AlertDialogContent>
        </AlertDialog>
      );
    }
  };

  useEffect(() => {
    const getListData = async () => {
      setLoading(true);
      const listDatabase = await getListDatabase(selectedWorkspace)
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
    if (listWorkspace.length > 0) {
      getListData();
    }
  }, [listWorkspace, selectedWorkspace, session?.session?.user?.id]);

  const refreshListDatabase = async () => {
    setLoading(true);
    const listDatabase = await getListDatabase(selectedWorkspace)
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
        <div className="flex space-x-3">
          {checkListWorkspace()}
          {/* search */}
          <Select
            key={listWorkspace}
            onValueChange={(value) => {
              setSelectedWorkspace(value);
            }}
            defaultValue={listWorkspace[0]?.workspace_id || ""}
            disabled={loading}
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
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={refreshListDatabase}
          >
            <RefreshCw className={`w-5 h-5 ${loading && "animate-spin"}`} />
          </Button>
        </div>
        {/* <div className={"flex items-center space-x-3"}>
          <Button disabled={true} title={"Coming soon"}>
            Create Form with out Database
          </Button>
          <Button onClick={refreshListDatabase}>
            <RefreshCw className={`w-6 h-6 ${loading && "animate-spin"}`} />
          </Button>
        </div> */}
      </div>
      {selectedWorkspace ? (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          onClick={() => {
            createFormWithoutDatabase();
          }}
        >
          <div className="flex flex-wrap justify-center py-16 border rounded-md cursor-pointer mb-5 group hover:bg-primary select-none">
            <Newspaper className="w-16 h-16 text-primary group-hover:text-secondary mb-5" />
            <h3 className="text-lg font-medium text-primary group-hover:text-secondary w-full text-center">
              Create Form without Database
            </h3>
            <p className="text-muted-foreground w-full text-center">
              We handle the database setup for you.
            </p>
            <div className="w-full text-center text-sm mt-2">
              <span className="bg-red-500 rounded-full text-white px-3 py-1">
                Suggested for Easy Use
              </span>
            </div>
          </div>
        </motion.div>
      ) : (
        <Skeleton className="py-24 mb-5" />
      )}
      {/* border or at center */}
      <div className="relative mb-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            OR SELECT A DATABASE
          </span>
        </div>
      </div>

      {loading ? (
        <ListMyDatabaseLoading />
      ) : (
        <div className={"grid grid-cols-3 gap-4"}>
          <CardDatabaseList
            listDatabase={listDatabase}
            selectedWorkspace={selectedWorkspace}
          />
        </div>
      )}
    </div>
  );
};

export default ListMyDatabase;
