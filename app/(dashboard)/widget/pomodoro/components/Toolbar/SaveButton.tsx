"use client"
import {Button} from "@/components/ui/button";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {supabase} from "@/lib/supabase";
import {useState} from "react";
import {Icons} from "@/components/Icons";
import {setIdPomodoro} from "@/app/redux/slice/pomodoroController.slice";
import {useSupabase} from "@/app/hook/supabase-provider";
import {Copy, ExternalLink} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";

const SaveButtonPomodoroToolbar = () => {
    const {user} = useSupabase();
    const {toast} = useToast()
    const dispatch = useAppDispatch()
    const {pomodoro, customization, customTimer, key, id} = useAppSelector(state => state.pomodoroReducer)
    const [loading, setLoading] = useState(false)
    const saveData = async () => {
        if (!user?.id) {
            return
        }
        let pomodoroData = {
            pomodoro,
            customization,
            customTimer,
            key
        }
        let upsertData: any = {
            data: pomodoroData,
            user_id: user?.id
        }
        if (id) {
            upsertData = {
                ...upsertData,
                id
            }
        }

        setLoading(true)
        const {data, error} = await supabase
            .from('pomodoro')
            .upsert(upsertData).select()
        setLoading(false)
        if (error) {
            console.log(error)
            return
        }
        const pomodoroId = data[0].id
        dispatch(setIdPomodoro(pomodoroId))

        toast({
            title: 'Saved',
            description: 'Pomodoro saved',
            duration: 2000,
        })
    }

    const copyToClipboard = () => {
        if (!id) return
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/pomodoro/${id}`)
        toast({
            title: 'Copied',
            description: 'Link copied to clipboard',
            duration: 2000,
        })
    }

    const openInNewTab = () => {
        if (!id) return
        window.open(`${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/pomodoro/${id}`, '_blank')
    }

    return (
        <div className={'flex justify-between items-center mt-5'}>
            <div className={'w-10/12 pr-5'}>
                {id && (
                    <div
                        className={'border h-10 rounded-md flex items-center px-5 whitespace-nowrap overflow-hidden text-ellipsis relative'}>
                        {`${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/pomodoro/${id}`}
                        <div onClick={copyToClipboard}
                             className={'absolute right-0 px-3 py-1.5 mr-2 shadow-md rounded-md bg-foreground text-secondary cursor-pointer'}>
                            <Copy className={'h-4 w-4'}/>
                        </div>
                        <div
                            onClick={openInNewTab}
                            className={'absolute right-12 px-3 py-1.5 mr-2 shadow-md rounded-md bg-foreground text-secondary cursor-pointer'}>
                            <ExternalLink className={'h-4 w-4'}/>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <Button onClick={saveData} disabled={loading} className={'px-10'}>
                    {loading && (
                        <Icons.spinner className="animate-spin mr-2 h-5 w-5"/>
                    )}
                    Save
                </Button>
            </div>
        </div>
    )
}
export default SaveButtonPomodoroToolbar
