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
  console.log(data);
  if (path == "/") {
    path = "";
  }
  console.log("patch", path);
  //filter with path
  const filteredData = data.filter((item: any) => item.pathname == path);
  if (filteredData.length > 0) {
    return filteredData[0].formId;
  }
  return null;
};
