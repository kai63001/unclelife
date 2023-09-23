import axios from "axios";


const notionApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_FRONT_END_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const insertForm = async ({
    workspaceId,
    layer,
    user_id,
    detail,
    databaseId,
}:any) => {
    const response = await notionApi.post(`/api/form/main`, {
        workspaceId,
        layer,
        user_id,
        detail,
        databaseId,
    });
    return response.data;
}

export const updateForm = async ({
    id,
    detail,
    layer,
}:any) => {
    const response = await notionApi.put(`/api/form/main`, {
        id,
        detail,
        layer,
    });
    return response.data;
}
