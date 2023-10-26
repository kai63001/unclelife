"use client";

export const DividerRenderBlock = ({
  data,
  updateInputForm,
  error,
  isSubscribed,
}: any) => {
  if (data.hidden || !isSubscribed) return <></>;
  return (
    <div className="w-full my-5">
      <hr />
    </div>
  );
};
