const TextBlockRender = ({
  data,
  updateInputForm,
  error,
  isSubscribed,
}: any) => {
  return <p dangerouslySetInnerHTML={{
    __html: data?.label,
  }}></p>;
};

export default TextBlockRender;
