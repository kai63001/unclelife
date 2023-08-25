import axios from "axios";


const notionApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_FRONT_END_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getDatabase = async (id: string) => {
    const response = await notionApi.get(`/api/notion/database?id=${id}`);
    return response.data;
};

export const getListDatabase = async (userId: string) => {
    const response = await notionApi.get(`/api/notion/search/database?userId=${userId}`);
    return response.data;
}

export const updateDatabase = async (id: string, properties: any, userId: any) => {
    const response = await notionApi.put(`/api/notion/database?id=${id}`, {
        properties,
    }, {
        headers: {
            cookie: `tokenCode=${userId}`,
        }
    });
    return response.data;
};

//upload file to a notion
export const uploadFile = async (file: any) => {
    const response = await notionApi.post(`/api/notion/upload`, file);
    return response.data;
}
