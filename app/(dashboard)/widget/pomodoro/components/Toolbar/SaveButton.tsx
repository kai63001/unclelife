"use client"
import {Button} from "@/components/ui/button";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import {supabase} from "@/lib/supabase";
import {useState} from "react";
import {Icons} from "@/components/Icons";
import {setIdPomodoro} from "@/app/redux/slice/pomodoroController.slice";
import {useSupabase} from "@/app/hook/supabase-provider";

const SaveButtonPomodoroToolbar = () => {
    const {user} = useSupabase();
    const dispatch = useAppDispatch()
    const {pomodoro, customization, customTimer, key, id} = useAppSelector(state => state.pomodoroReducer)
    const [loading, setLoading] = useState(false)
    const saveData = async () => {
        if(!user?.id) {
            return
        }
        let pomodoroData = {
            pomodoro,
            customization,
            customTimer,
            key
        }
        let upsertData:any = {
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
    }

    return (
        <div className={'flex justify-between items-center mt-5'}>
            <div className={'w-10/12 pr-5'}>
                {id && (
                    <p className={'border h-10 rounded-md flex items-center px-5 whitespace-nowrap overflow-hidden text-ellipsis'}>
                        {`${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/pomodoro/${id}`}
                    </p>
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
