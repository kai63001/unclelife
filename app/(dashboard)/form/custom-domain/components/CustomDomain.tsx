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
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState("");
  const { toast } = useToast();

  const handleSave = async () => {
    setLoading(true);
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
      setLoading(false);
      return;
    }
    setListDomain([...listDomain, ...newDomain.data]);
    setAdding(false);
    setLoading(false);
  };

  const handleDelete = async (domain: string) => {
    setLoading(true);
    const { data, error } = await deleteCustomDomainForm(domain);
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const newListDomain = listDomain.filter(
      (item: any) => item.domain_id !== domain
    );
    setListDomain(newListDomain);
    setLoading(false);
  };

  const handleVerify = async (domain: string) => {
    setLoading(true);
    const { data, error } = await verifyCustomDomainForm(domain);
    if (error) {
      setLoading(false);
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
    setLoading(false);
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
                  <Verified />
                ) : (
                  <NotVerified
                    handleVerify={() => handleVerify(item?.domain_id)}
                    loading={loading}
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
                    <Button disabled={loading} variant="destructive">
                      Delete
                    </Button>
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
              <Button disabled={loading} className="px-10" onClick={handleSave}>
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

const NotVerified = ({ handleVerify, loading }: any) => {
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
            disabled={loading}
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

const Verified = () => {
  return (
    <span
      className={
        "px-2 py-1 bg-green-500 text-white flex w-fit rounded-md uppercase"
      }
    >
      Verified
    </span>
  );
};

export default CustomDomainComponent;
