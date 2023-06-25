import axios from "axios";

const notionApi = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDatabase = async (id:string) => {
  const response = await notionApi.get(`/api/notion/database?id=${id}`);
  return response.data;
};
