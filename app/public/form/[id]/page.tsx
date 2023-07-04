import FormMainBox from "@/app/custom/components/formMain";

const PublicFormPage = ({ params }: { params: { id: string } }) => {
    console.log(params)
  return (
    <div className="h-screen w-screen lg:flex">
      <div className="lg:m-auto">
        <div className="border-2 p-5 lg:min-w-[500px] w-full rounded-sm">
          <FormMainBox id={params.id} />
        </div>
      </div>
    </div>
  );
};

export default PublicFormPage;
