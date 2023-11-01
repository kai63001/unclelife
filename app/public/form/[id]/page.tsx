import FormMainBox from "@/app/custom/components/formMain";
import type { Metadata } from "next";
import { getFormData } from "@/lib/formController";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const revalidate = 3;

//metadata generate
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const responseData = await getFormData(id);

  const title = responseData?.data
    ? `${responseData.data.detail.title}`
    : "Form - Uncle Life";

  return {
    title,
  };
}

const PublicFormPage = async ({ params: { id } }: Props) => {
  const responseData = await getFormData(id);
  const dataForm = responseData?.data ? responseData.data.detail : null;
  const formId = responseData?.data ? responseData.data.id : null;

  const dataUser: any = responseData?.data ? responseData.data.user_id : null;
  if (responseData.error || dataForm?.visibility == "closed") {
    return (
      <div className="h-screen w-screen md:flex overflow-x-hidden md:flex-col">
        <div className="m-auto">
          <div className="md:max-w-[700px] w-full rounded-sm">
            <h1 className="mt-10 text-5xl font-bold">Form Not Found</h1>
            <div className="text-center mt-5">
              <Button asChild>
                <Link href="/">Create my form</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen w-screen md:flex overflow-x-hidden md:flex-col"
      style={{
        backgroundColor:
          dataForm?.pro?.customizations?.light?.enableBackgroundColor &&
          dataUser?.is_subscribed
            ? dataForm?.pro?.customizations?.light?.backgroundColor
            : null,
      }}
    >
      <div className="w-full">
        {dataForm?.pro?.customizations?.coverPicture &&
          dataUser?.is_subscribed && (
            <div className="w-full h-64 bg-cover bg-center bg-no-repeat relative">
              <Image
                unoptimized={true}
                src={dataForm?.pro?.customizations?.coverPicture as string}
                alt={"cover image"}
                fill
                className={"w-full h-full object-cover object-center"}
              />
            </div>
          )}
        {dataForm?.pro?.customizations?.logoPicture &&
          dataUser?.is_subscribed && (
            <div className="flex w-full">
              <div className="mx-auto w-full">
                <div className="mx-auto max-w-[700px] w-full h-32">
                  <div
                    className={cn(
                      `h-32 w-32 bg-cover bg-center bg-no-repeat relative rounded-full overflow-hidden mx-4`,
                      dataForm?.pro?.customizations?.coverPicture
                        ? "-mt-[70px]"
                        : "mt-4"
                    )}
                  >
                    <Image
                      unoptimized={true}
                      src={dataForm?.pro?.customizations?.logoPicture as string}
                      alt={"logo image"}
                      objectPosition="center"
                      fill
                      className={"w-full h-full object-cover"}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
      <div className="mx-auto">
        <div className="md:max-w-[700px] w-full rounded-sm">
          <FormMainBox id={formId} responseData={responseData} />
        </div>
      </div>
    </div>
  );
};

export default PublicFormPage;
