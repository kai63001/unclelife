"use client";
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
import { insertForm, updateForm } from "@/lib/formApi";
// import { getDecryptedIntegrationNotion } from "@/lib/notionApi";

const ButtonSaveCustomForm = ({ session }: any) => {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { layer, infomation, databaseId, form, workspaceId, logic, notification } =
    useAppSelector((state) => state.formReducer);
  const [warning, setWarning] = useState(false);
  const [mapLength, setMapLength] = useState(0);

  const copyLink = (idData = infomation.id) => {
    // console.log("copy link");
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_FRONT_END_URL}/public/form/${idData}`
    );
  };

  const checkAllInputIsMaped = () => {
    const inputForm = layer.filter(
      (item: any) => item.mapTo && item.block != true
    );
    const newLayer = layer.filter((item: any) => item.block != true);
    // console.log("inputForm", inputForm);
    // console.log(layer.length, inputForm.length);
    if (newLayer.length != inputForm.length) {
      setWarning(true);
      setMapLength(layer.length - inputForm.length);
      return;
    }
    return saveLayer();
  };

  const saveLayer = async () => {
    // const token = await getDecryptedIntegrationNotion(workspaceId)
    // console.log('token', token)
    //log user id
    setLoading(true);
    setWarning(false);
    const newForm = {
      ...form,
      workspaceId: workspaceId,
    };
    if (infomation.id) {
      // const {data, error} = await supabase
      //     .from("form")
      //     .upsert({
      //         id: infomation.id,
      //         detail: form,
      //         layer: layer,
      //     })
      //     .select();
      const { data, error } = await updateForm({
        id: infomation.id,
        detail: newForm,
        layer: layer,
        logic: logic,
        notification
      });
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
    // const {data, error} = await supabase
    //     .from("form")
    //     .insert({
    //         layer: layer,
    //         user_id: session?.user?.id || "",
    //         detail: form,
    //         databaseId,
    //         workspaceId
    //     })
    //     .select();

    const { data, error } = await insertForm({
      layer: layer,
      user_id: session?.user?.id || "",
      detail: newForm,
      databaseId,
      workspaceId,
      logic,
      notification
    });
    if (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error?.message?.toString(),
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    setLoading(false);
    dispatch(
      setInformation({
        id: data.id,
      })
    );

    //update a fake path
    router.replace(`/custom/form?id=${data.id}`);

    //toast success
    toast({
      title: "Success",
      description: "Your form has been saved",
      action: (
        <ToastAction
          onClick={() => copyLink(data.id)}
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
        variant={"default"}
        className="h-full px-10 py-3 font-medium rounded-md"
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
          </DialogHeader>
          <div>
            <p>
              {
                "Please ensure you've linked the fields to the database columns before moving on."
              }
            </p>
            <p>{`You have ${mapLength} fields that haven't been mapped.`}</p>
          </div>
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
