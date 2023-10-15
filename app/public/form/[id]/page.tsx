import FormMainBox from "@/app/custom/components/formMain";
import type { Metadata } from 'next'
import {getFormData} from "@/lib/formController";

export const revalidate = 3;

//metadata generate
type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    {params : {id}}: Props,
): Promise<Metadata> {
    const responseData = await getFormData(id)

    const title = responseData?.data ? `${responseData.data.detail.title}` : "Form - Uncle Life";

    return {
        title,

    }
}

const PublicFormPage = async ({params : {id}}: Props) => {
    const responseData = await getFormData(id)

    return (
        <div className="h-screen w-screen md:flex overflow-x-hidden">
            <div className="mx-auto">
                <div className="md:max-w-[700px] w-full rounded-sm">
                    <FormMainBox id={id} responseData={responseData}/>
                </div>
            </div>
        </div>
    );
};

export default PublicFormPage;
