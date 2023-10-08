const TextBlockRender = ({
  data,
  updateInputForm,
  error,
  isSubscribed,
}: any) => {
  if (data.hidden) return <></>;
  return <p dangerouslySetInnerHTML={{
    __html: data?.label,
  }}></p>;
};

export default TextBlockRender;
