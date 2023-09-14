import axios from "axios";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {cache} from "react";


const supabase = createClientComponentClient();

export async function uploadPomodoroWallpaper(file: any, keyForm: string) {
    return await axios.post(`/api/pomodoro/uploadWallpaper?id=${keyForm}`, {
        imageBase64: file
    })
}


export const getPomodoroData = cache(async (id: string) => {
    return await supabase
        .from("pomodoro")
        .select("*")
        .eq("id", id)
        .single()
})
