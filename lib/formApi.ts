import axios from "axios";
import { addCustomDomain } from "./renderApi";

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
  logic,
  notification,
}: any) => {
  const response = await notionApi.post(`/api/form/main`, {
    workspaceId,
    layer,
    user_id,
    detail,
    databaseId,
    logic,
    notification,
  });
  return response.data;
};

export const updateForm = async ({
  id,
  detail,
  layer,
  logic,
  notification,
}: any) => {
  const response = await notionApi.put(`/api/form/main`, {
    id,
    detail,
    layer,
    logic,
    notification,
  });
  return response.data;
};

export const addCustomDomainForm = async (domain: any) => {
  const response = await notionApi.post(`/api/form/custom-domain`, {
    domain,
  });
  return response.data;
};

export const getCustomDomainForm = async () => {
  const response = await notionApi.get(`/api/form/custom-domain`);
  return response.data;
};

export const verifyCustomDomainForm = async (domain: any) => {
  const response = await notionApi.post(`/api/form/custom-domain/verify`, {
    domain,
  });
  return response.data;
};

export const deleteCustomDomainForm = async (domain: any) => {
  const response = await notionApi.delete(`/api/form/custom-domain`, {
    data: {
      domain,
    },
  });
  return response.data;
};

export const updateCustomDomainForm = async (domain: any, mapping: any) => {
  const response = await notionApi.put(`/api/form/custom-domain`, {
    domain,
    mapping,
  });
  return response.data;
};

export const updateNotification = async (formId: any, notification: any) => {
  const response = await notionApi.post(`/api/form/notification`, {
    formId,
    notification,
  });
  return response.data;
};

export const sendEmail = async (formId: any, email: any) => {
  const response = await notionApi.post(`/api/form/notification/send-email`, {
    formId,
    email,
  });
  return response.data;
};