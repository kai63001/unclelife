const HeaderBannder = () => {
  return (
    <h1 className="text-center text-5xl font-extrabold mt-28">
      Level up your Notion docs with{" "}
      <span
        className={"bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"}
      >
        Forms
      </span>{" "}
      and{" "}
      <span
        className={
          "bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
        }
      >
        Widgets
      </span>
    </h1>
  );
};

export default HeaderBannder;
