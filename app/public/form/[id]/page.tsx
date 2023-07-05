import FormMainBox from "@/app/custom/components/formMain";

const PublicFormPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="h-screen w-screen lg:flex overflow-x-hidden">
      <div className="lg:m-auto">
        <div className="p-5 lg:min-w-[500px] w-full rounded-sm">
          <FormMainBox id={params.id} />
        </div>
      </div>
    </div>
  );
};

export default PublicFormPage;
