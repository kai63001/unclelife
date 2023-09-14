import axios from "axios";

export async function uploadPomodoroWallpaper(file: any,keyForm: string) {
    return await axios.post(`/api/pomodoro/uploadWallpaper?id=${keyForm}`, {
        imageBase64: file
    })
}
