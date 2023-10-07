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
    logic
}:any) => {
    const response = await notionApi.post(`/api/form/main`, {
        workspaceId,
        layer,
        user_id,
        detail,
        databaseId,
        logic
    });
    return response.data;
}

export const updateForm = async ({
    id,
    detail,
    layer,
    logic
}:any) => {
    const response = await notionApi.put(`/api/form/main`, {
        id,
        detail,
        layer,
        logic
    });
    return response.data;
}
