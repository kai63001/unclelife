"use client"
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {useEffect, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {RefreshCcw, Trash} from "lucide-react";
import {Icons} from "@/components/Icons";
import {getAuthLink} from "@/lib/notionApi";
import {cn} from "@/lib/utils";

const WorkspaceSetting = () => {
    const [listWorkspace, setListWorkspace] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)

    const supabase = createClientComponentClient()

    useEffect(() => {
        const getWorkspace = async () => {
            const {data} = await supabase.from('integration_notion').select('workspace_name, workspace_id, workspace_icon')
            setListWorkspace(data)
        }
        getWorkspace().then(r => r)
    }, [supabase]);

    const addWorkspace = async () => {
        const url = await getAuthLink()
        const win = window.open(url, '_blank');
        win?.focus();
    }

    const refreshWorkspace = async () => {
        setLoading(true)
        setListWorkspace([])
        const {data} = await supabase.from('integration_notion').select('workspace_name, workspace_id, workspace_icon')
        setListWorkspace(data)
        setLoading(false)
    }

    const deleteWorkspace = async (workspaceId: string) => {
        await supabase.from('integration_notion').delete().match({workspace_id: workspaceId})
        const {data} = await supabase.from('integration_notion').select('workspace_name, workspace_id, workspace_icon')
        setListWorkspace(data)
    }

    return (
        <>
            <div className={'grid grid-cols-2 gap-3'}>
                {
                    listWorkspace?.map((workspace: any, index: any) => (
                        <div key={index} className={'border rounded-md px-10 py-5 grid grid-cols-5 gap-3'}>
                            <div className={'col-span-1'}>
                                <div className={'w-20 h-20 mr-10 bg-gray-300 rounded-full overflow-hidden'}>
                                    <Avatar className={"w-20 h-20"}>
                                        <AvatarImage src={workspace.workspace_icon} alt="workspace ICON"/>
                                        <AvatarFallback>WS</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                            <div className={'col-span-4 pl-10 flex flex-col justify-between'}>
                                <b>
                                    {workspace.workspace_name}
                                </b>
                                <div className={'flex'}>
                                    <Button onClick={()=>{
                                        deleteWorkspace(workspace.workspace_id).then(r => r)
                                    }} className={'w-auto'}>
                                        <Trash className={'mr-2 h-4 w-4'}/>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={'flex justify-center mt-5'}>
                <Button onClick={addWorkspace} className={'w-72'}>
                    <Icons.notion className={'mr-2 h-5 w-5'}/>
                    Add Workspace
                </Button>
                <Button onClick={refreshWorkspace} className={'ml-2'}>
                    <RefreshCcw className={cn(loading && 'animate-spin')}/>
                </Button>
            </div>
        </>

    )
}

export default WorkspaceSetting
