import {useToast} from "@/components/ui/use-toast";
import {useAppSelector} from "@/app/redux/hook";
import {DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useQRCode} from "next-qrcode";

const FormInQRCode = () => {
    const {toast} = useToast();
    const {infomation} = useAppSelector((state) => state.formReducer);
    const { Canvas } = useQRCode();

    return (
        <>
            <DialogHeader>
                <DialogTitle>QR Code</DialogTitle>
                <DialogDescription>
                    Use a QR code scanner to access the form (You can copy the image by right-clicking on it)
                </DialogDescription>
            </DialogHeader>
            <div className={'flex justify-center border py-5 rounded-md'}>
                <Canvas
                    text={`${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/form/${infomation.id}`}
                    options={{
                        level: 'M',
                        margin: 2,
                        scale: 1,
                        width: 300,
                        color: {
                            dark: '#ea1e1e',
                            light: '#ffffff',
                        },
                    }}
                />
            </div>
        </>
    );
};

export default FormInQRCode