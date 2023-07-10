import axios from "axios";

const notionApi = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDatabase = async (id: string) => {
  const response = await notionApi.get(`/api/notion/database?id=${id}`);
  return response.data;
};

export const updateDatabase = async (id: string, properties: any) => {
  const response = await notionApi.put(`/api/notion/database?id=${id}`, {
    properties,
  });
  return response.data;
};

//upload file to notion
export const uploadFile = async (file: any) => {
  const response = await notionApi.post(`/api/notion/upload`, file);
  return response.data;
}
