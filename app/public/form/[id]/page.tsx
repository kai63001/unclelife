import FormMainBox from "@/app/custom/components/formMain";

const PublicFormPage = ({ params }: { params: { id: string } }) => {
    console.log(params)
  return (
    <div className="h-screen w-screen flex">
      <div className="m-auto">
        <div className="border-2 p-5 min-w-[500px] w-full rounded-sm">
          <FormMainBox id={params.id} />
        </div>
      </div>
    </div>
  );
};

export default PublicFormPage;
