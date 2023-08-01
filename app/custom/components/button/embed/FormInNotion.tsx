"use client"
import {DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useAppSelector} from "@/app/redux/hook";
import {useToast} from "@/components/ui/use-toast";

const FormInNotion = () => {
    const {toast} = useToast();
    const {infomation} = useAppSelector((state) => state.formReducer);
    const copyLink = (idData = infomation.id) => {
        navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/form/${idData}`
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
                <DialogTitle>Embed your form in a Notion Page</DialogTitle>
                <DialogDescription>
                    Embedding your form into your Notion page is a simple process. Begin by copying the URL of your form
                    provided below:
                </DialogDescription>
            </DialogHeader>
            <div>
                <div className={'border rounded-md px-5 py-2 flex items-center justify-between'}>
                    <span className={'text-sm'}>
                        {`${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/form/${infomation.id}`}
                    </span>
                    <Button onClick={() => copyLink()}>
                        COPY
                    </Button>
                </div>
                <p className={'my-5'}>
                    Next, navigate to your preferred page in Notion, initiate an {`'`}embed component{`'`} by
                    typing <span className={'bg-red-600 px-2 py-0.5 rounded-md'}>/embed</span>, and effortlessly paste
                    the link you{`'`}ve just copied!
                </p>
            </div>
        </>
    );
};

export default FormInNotion;