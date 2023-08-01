"use client"
import {DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useAppSelector} from "@/app/redux/hook";
import {useToast} from "@/components/ui/use-toast";

const FormInWebsite = () => {
    const {toast} = useToast();
    const {infomation} = useAppSelector((state) => state.formReducer);
    const copyLink = (idData = infomation.id) => {
        navigator.clipboard.writeText(
            `<iframe src="${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/form/${idData}" width="100%" height="500px" style="border:none;width:100%;"></iframe>`
        ).then(() => (
            toast({
                title: "Copied",
                description: "Link copied to clipboard",
            })
        ))
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Embed your form in a website</DialogTitle>
                <DialogDescription>
                    Integrate your form into your website by duplicating the HTML code provided below.
                </DialogDescription>
            </DialogHeader>
            <div>
                <div className={'border rounded-md px-5 py-2 flex items-center justify-between'}>
                    <span className={'text-sm'}>
                        {`
                            <iframe src="${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/form/${infomation.id}" width="100%" height="500px" style="border:none;width:100%;"></iframe>
                        `}
                    </span>
                    <Button onClick={() => copyLink()}>
                        COPY
                    </Button>
                </div>
            </div>
        </>
    );
};

export default FormInWebsite
