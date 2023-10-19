import axios from "axios";

const renderApi = axios.create({
  baseURL: "https://api.render.com/v1/services/srv-ckdcqgmsmu8c7386quo0",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.RENDER_TOKEN}`,
  },
});

export const addCustomDomain = async (domain: any) => {
  const response = await renderApi.post(`/custom-domains`, {
    name: domain,
  });
  return response.data;
};

export const retrieveCustomDomain = async (domain: any) => {
  const response = await renderApi.get(`/custom-domains/${domain}`);
  return response.data;
};

export const deleteCustomDomain = async (domain: any) => {
  const response = await renderApi.delete(`/custom-domains/${domain}`);
  return response.data;
};

export const verifyCustomDomain = async (domain: any) => {
  const response = await renderApi.post(`/custom-domains/${domain}/verify`);
  return response.data;
};
