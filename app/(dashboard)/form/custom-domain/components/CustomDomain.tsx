"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  addCustomDomainForm,
  deleteCustomDomainForm,
  getCustomDomainForm,
  verifyCustomDomainForm,
} from "@/lib/formApi";
import { Fragment, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CustomDomainComponent = () => {
  const [adding, setAdding] = useState(false);
  const [listDomain, setListDomain] = useState<string[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [domain, setDomain] = useState("");
  const { toast } = useToast();

  const handleSave = async () => {
    if (domain === "") {
      return;
    }
    const newDomain = await addCustomDomainForm(domain);
    if (newDomain?.message === "error") {
      toast({
        title: "Error",
        description: newDomain?.error.message,
        variant: "destructive",
      });
      return;
    }
    setListDomain([...listDomain, ...newDomain.data]);
    setAdding(false);
  };

  const handleDelete = async (domain: string) => {
    const { data, error } = await deleteCustomDomainForm(domain);
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    const newListDomain = listDomain.filter(
      (item: any) => item.domain_id !== domain
    );
    setListDomain(newListDomain);
  };

  const handleVerify = async (domain: string) => {
    const { data, error } = await verifyCustomDomainForm(domain);
    console.log(data, error);
    if (error) {
      if (error == "domain not verified") {
        return;
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    const newListDomain = listDomain.map((item: any) => {
      if (item.domain_id === domain) {
        item.verify = true;
      }
      return item;
    });
    setListDomain(newListDomain);
  };

  useEffect(() => {
    const getListDomain = async () => {
      const { data } = await getCustomDomainForm();
      setListDomain(data);
    };
    getListDomain();
  }, []);

  return (
    <div className="border rounded-md mt-5 p-10">
      <h2 className="text-2xl font-bold border-b pb-5">Custom Domain</h2>
      <div className="pt-5">
        <div className="grid grid-cols-3 gap-x-4 gap-y-10">
          {listDomain.map((item: any, index) => (
            <Fragment key={index}>
              <div>{item?.domain}</div>
              <div>
                {item?.verify ? (
                  <div>DONE</div>
                ) : (
                  <NotVerified
                    handleVerify={() => handleVerify(item?.domain_id)}
                  />
                )}
              </div>
              <div className="flex justify-end">
                <AlertDialog
                  onOpenChange={(e) => {
                    setConfirmDelete(e);
                  }}
                  open={confirmDelete}
                >
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the {item?.domain} domain.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(item?.domain_id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="mt-5">
          {adding ? (
            <div className="flex space-x-4 w-11/12">
              <Input
                onChange={(e) => {
                  setDomain(e.target.value);
                }}
                placeholder="www.example.com"
              />
              <Button className="px-10" onClick={handleSave}>
                Save
              </Button>
              <Button onClick={() => setAdding(false)} variant={"ghost"}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant={"outline"}
              onClick={() => {
                setAdding(true);
              }}
            >
              Add Custom Domain
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const NotVerified = ({ handleVerify }: any) => {
  return (
    <div>
      <p>DNS update needed</p>
      <div className="pt-5">
        <div className="flex">
          <div>
            Add a CNAME record for *.cname pointing to
            test-wildcard.onrender.com
          </div>
        </div>
        <div className="mt-5">
          <Button
            onClick={() => {
              handleVerify();
            }}
          >
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomDomainComponent;
