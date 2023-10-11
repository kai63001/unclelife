"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  addCustomDomainForm,
  deleteCustomDomainForm,
  getCustomDomainForm,
  updateCustomDomainForm,
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
import { ArrowRight, Plus, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const CustomDomainComponent = () => {
  const supabase = createClientComponentClient();

  const [adding, setAdding] = useState(false);
  const [listDomain, setListDomain] = useState<string[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState("");
  const [myForm, setMyForm] = useState<any[]>([]);
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
    const getMyForm = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user?.id) {
        return;
      }
      const { data }: any = await supabase
        .from("form")
        .select("*")
        .eq("user_id", session?.session?.user?.id);
      console.log(data);
      setMyForm(data);
    };
    getMyForm();

    getListDomain();
  }, [supabase]);

  const addPathMappingByIndex = (index: number) => {
    const newListDomain = listDomain.map((item: any, i: number) => {
      if (i === index) {
        if (!item.mapping) {
          item.mapping = [];
        }
        item.mapping.push({
          pathname: "",
          formId: "",
        });
      }
      return item;
    });
    setListDomain(newListDomain);
  };

  const deletePathMappingByIndex = (index: number, mapperIndex: number) => {
    const newListDomain = listDomain.map((item: any, i: number) => {
      if (i === index) {
        item.mapping.splice(mapperIndex, 1);
      }
      return item;
    });
    setListDomain(newListDomain);
  };

  const handleMapping = (
    index: number,
    mapperIndex: number,
    value: any,
    key = "pathname"
  ) => {
    const newListDomain = listDomain.map((item: any, i: number) => {
      if (i === index) {
        item.mapping[mapperIndex][key] = value;
      }
      return item;
    });
    setListDomain(newListDomain);
  };

  const handleSaveMapping = async (domain_id: any, mapping: any) => {
    const { data, error } = await updateCustomDomainForm(domain_id, mapping);
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    console.log(data);
    toast({
      title: "Success",
      description: "Your mapping has been saved",
    });
  };

  return (
    <>
      <div className="border rounded-md mt-5 p-10">
        <h2 className="text-2xl font-bold border-b pb-5">Custom Domain</h2>
        <div className="pt-5">
          <div className="grid grid-cols-3 gap-x-4 gap-y-10">
            {listDomain.map((item: any, index) => (
              <Fragment key={index}>
                <div className="font-semibold">{item?.domain}</div>
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
                <Button
                  disabled={loading}
                  className="px-10"
                  onClick={handleSave}
                >
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
      {listDomain.filter((item: any) => item?.verify).length > 0 &&
        listDomain.map((item: any, index) => (
          <div key={index} className="border rounded-md mt-5 p-10">
            <h3 className="text-2xl font-bold border-b pb-5">{item?.domain}</h3>
            {/* map pathname to form */}
            <div className="grid grid-cols-12 gap-4 pt-5">
              {item?.mapping &&
                item?.mapping.map((mapper: any, mapperIndex: number) => (
                  <Fragment key={mapperIndex}>
                    <div className="col-span-5 flex">
                      <Input
                        value={item?.domain}
                        className="rounded-r-none w-fit"
                        disabled
                      />
                      <Input
                        value={mapper?.pathname}
                        className="rounded-l-none"
                        placeholder="Enter your pathname"
                        onChange={(e) => {
                          handleMapping(index, mapperIndex, e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                    <div className="col-span-5">
                      <Select
                        onValueChange={(e) => {
                          handleMapping(index, mapperIndex, e, "formId");
                        }}
                        value={mapper?.formId || undefined}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Form" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Forms</SelectLabel>
                            {myForm.map((form: any, FormIndex) => (
                              <SelectItem key={FormIndex} value={form?.id}>
                                {form?.detail?.title || "Untitled Form"}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                      <Button
                        onClick={() => {
                          deletePathMappingByIndex(index, mapperIndex);
                        }}
                        variant={"destructive"}
                        size={"icon"}
                      >
                        <Trash className="h-5 w-5" />
                      </Button>
                    </div>
                  </Fragment>
                ))}
            </div>
            <div className="flex justify-end mt-5 space-x-3">
              <Button
                onClick={() => addPathMappingByIndex(index)}
                className="px-5"
                variant={"ghost"}
              >
                <Plus className="h-5 w-5 mr-3" />
                Add Another Path
              </Button>
              <Button
                onClick={() => {
                  handleSaveMapping(item?.domain_id, item?.mapping);
                }}
                className="px-10"
              >
                Save Changes
              </Button>
            </div>
          </div>
        ))}
    </>
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
