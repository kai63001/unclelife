const TextBlockRender = ({
  data,
  updateInputForm,
  error,
  isSubscribed,
}: any) => {
  if (data.hidden || !isSubscribed) return <></>;
  return <p className="mb-2" dangerouslySetInnerHTML={{
    __html: data?.label,
  }}></p>;
};

export default TextBlockRender;
