export const validateDomain = async (domain: string, path: string) => {
  //use fectch
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FRONT_END_URL}/api/custom-domain`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domain }),
    }
  );
  const { data } = await response.json();
  if (path == "/") {
    path = "";
  }
  //filter with path
  const filteredData = data?.filter((item: any) => item.pathname == path);
  if (filteredData?.length > 0) {
    return filteredData[0].formId;
  }
  return null;
};

export const checkIsEnterprise = async (formId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FRONT_END_URL}/api/form/check-enterpise`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formId }),
    }
  );
  const { is_enterprise } = await response.json();
  return is_enterprise;
};
