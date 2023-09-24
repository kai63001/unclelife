import axios from "axios";

const notionApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FRONT_END_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDatabase = async (id: string, workspace_id: string) => {
  const response = await notionApi.get(
    `/api/notion/database?id=${id}&workspace_id=${workspace_id}`
  );
  return response.data;
};

export const getListDatabase = async (workspace_id: string) => {
  const response = await notionApi.get(
    `/api/notion/search/database?workspace_id=${workspace_id}`
  );
  return response.data;
};

export const getListPage = async (workspace_id: string) => {
  const response = await notionApi.get(
    `/api/notion/search/page?workspace_id=${workspace_id}`
  );
  return response.data;
};

export const updateDatabase = async (
  id: string,
  properties: any,
  userId: any,
  form_id: any
) => {
  const response = await notionApi.put(
    `/api/notion/database?id=${id}&userid=${userId}`,
    {
      properties,
      form_id,
    }
  );
  return response.data;
};

//upload file to a notion
export const uploadFile = async (file: any) => {
  const response = await notionApi.post(`/api/notion/upload`, file);
  return response.data;
};

//get authlink for notion
export const getAuthLink = async () => {
  // https://api.notion.com/v1/oauth/authorize?client_id=0ba04f1e-711b-43cb-a6cd-1c038b3913bc&response_type=code&owner=user&redirect_uri=https%3A%2F%2Fqpjxzzbztzjosvnoirap.supabase.co%2Fauth%2Fv1%2Fcallback
  return `https://api.notion.com/v1/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}&response_type=code&owner=user&redirect_uri=${process.env.NEXT_PUBLIC_FRONT_END_URL}/api/notion/auth`;
};

export const getDecryptedIntegrationNotion = async (workspace_id: string) => {
  const response = await notionApi.get(
    `/api/notion/decrypted-integration-notion?workspace_id=${workspace_id}`
  );
  return response.data;
};

export const createNotionDatabase = async ({
  title,
  properties,
  pageId,
  workspaceId,
}: any) => {
  const response = await notionApi.post(`/api/notion/create-database`, {
    title,
    properties,
    pageId,
    workspaceId,
  });
  return response.data;
};
