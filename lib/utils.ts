import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function checkKeyForm(onChangeHook: any, form: any) {
    if (form.key) {
        return form.key
    }
    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    onChangeHook(key, 'key')
    return key
}

export async function convertImageToWebp(file: any,keyForm: string) {
    return await axios.post(`/api/notion/uploadImage?id=${keyForm}`, {
        imageBase64: file
    })
}

