"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Icons } from "@/components/Icons";
import {
  setInformation,
  updateModalMapInputOpen,
} from "@/app/redux/slice/formController.slice";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeftRight } from "lucide-react";

const ButtonSaveCustomForm = ({ session }: any) => {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { layer, infomation, databaseId, form } = useAppSelector(
    (state) => state.formReducer
  );
  const [warning, setWarning] = useState(false);
  const [mapLength, setMapLength] = useState(0);

  const copyLink = (idData = infomation.id) => {
    console.log("copy link");
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/form/${idData}`
    );
  };

  const checkAllInputIsMaped = () => {
    const inputForm = layer.filter((item: any) => item.mapTo);
    console.log(layer.length, inputForm.length);
    if (layer.length != inputForm.length) {
      setWarning(true);
      setMapLength(layer.length - inputForm.length);
      return;
    }
    return saveLayer();
  };

  const supabase = createClientComponentClient();
  const saveLayer = async () => {
    //log user id
    setLoading(true);
    setWarning(false);
    if (infomation.id) {
      const { data, error } = await supabase
        .from("form")
        .upsert({
          id: infomation.id,
          detail: form,
          layer: layer,
        })
        .select();
      if (error) {
        console.log(error);
      }
      setLoading(false);
      toast({
        title: "Success",
        description: "Your form has been saved",
        action: (
          <ToastAction
            onClick={() => copyLink()}
            altText="Goto schedule to undo"
          >
            Copy Link
          </ToastAction>
        ),
      });
      return;
    }
    const { data, error } = await supabase
      .from("form")
      .insert({
        layer: layer,
        user: session?.user?.id || "",
        detail: form,
        databaseId,
      })
      .select();
    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }
    setLoading(false);
    dispatch(
      setInformation({
        id: data[0].id,
      })
    );

    //update fake path
    router.replace(`/custom/form?id=${data[0].id}`);

    //toast success
    toast({
      title: "Success",
      description: "Your form has been saved",
      action: (
        <ToastAction
          onClick={() => copyLink(data[0].id)}
          altText="Goto schedule to undo"
        >
          Copy Link
        </ToastAction>
      ),
    });
  };

  return (
    <>
      <Button
        onClick={checkAllInputIsMaped}
        disabled={loading}
        className="h-full px-10 py-3 font-medium bg-background text-primary hover:bg-secondary-hover hover:text-primary-hover rounded-md"
      >
        {loading && <Icons.spinner className="animate-spin mr-2 h-5 w-5" />}
        SAVE
      </Button>
      <Dialog
        open={warning}
        onOpenChange={(e) => {
          setWarning(e);
        }}
      >
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Column Map Alert</DialogTitle>
            <div>
              A notification that occurs when there are unassigned inputs in a
              mapping process. This alert is a cautionary prompt, advising the
              user that they have not yet associated three inputs with their
              corresponding columns in a notion layout. It provides the option
              for the user to either map the inputs or to proceed with the
              existing mapping configuration.
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                dispatch(updateModalMapInputOpen(true));
                setWarning(false);
              }}
            >
              <ArrowLeftRight className="h-4 w-4 mr-3" />
              Map Fields
            </Button>
            <Button onClick={saveLayer} variant={"outline"}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ButtonSaveCustomForm;
