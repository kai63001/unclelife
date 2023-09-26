"use client";
import { Trash } from "lucide-react";
import { useAppDispatch } from "@/app/redux/hook";
import { useState } from "react";
import {
  deleteLayerWithId,
} from "@/app/redux/slice/formController.slice";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DeleteLayer = ({ id }: any) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const confirmationDelete = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    setOpen(false);
    dispatch(
      deleteLayerWithId({
        id: id,
      })
    );
  };
  return (
    <div className="">
      <Button variant={"destructive"} onClick={confirmationDelete}>
        <Trash className="w-4 h-4" />
      </Button>
      {open && (
        <AlertDialog open={open}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                layer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default DeleteLayer;