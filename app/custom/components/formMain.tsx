"use client";
import {useAppDispatch, useAppSelector} from "@/app/redux/hook";
import RenderFormComponent from "../components/render/RenderForm";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useToast} from "@/components/ui/use-toast";
import {updateDatabase} from "@/lib/notionApi";
import {Icons} from "@/components/Icons";
import Link from "next/link";
import {
    setAllForm,
    setDatabaseId,
    setInformation,
    setLayer,
} from "@/app/redux/slice/formController.slice";
import {useSearchParams} from "next/navigation";
import SuccessPageComponent from "./successPage";

const FormMainBox = ({
                         id = null,
                         testMode = false,
                     }: {
    id?: string | null;
    testMode?: boolean;
}) => {
    const {toast} = useToast();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const supabase = createClientComponentClient();
    const [dataForm, setDataForm] = useState<any>({});
    const [dataLayer, setDataLayer] = useState<any>([]);
    const [databaseId, setDatabaseIdState] = useState<string>("");
    const {form, layer} = useAppSelector((state) => state.formReducer);
    const [loading, setLoading] = useState(false);

    const [inputForm, setInputForm]: any = useState<any>({});
    const [error, setError] = useState<any>({});
    const [successSubmit, setSuccessSubmit] = useState(false);

    const updateInputForm = (value: string, data: any) => {
        console.log(data);
        if (data.mapTo != undefined) {
            setInputForm({
                ...inputForm,
                [data.mapTo]: {
                    value,
                    type: data.mapType,
                },
            });
        }
    };

    useEffect(() => {
        if (layer.length === 0) {
            console.log("layer is empty")
            setDefaultInputFormLayer()
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layer])

    const setDefaultInputFormLayer = () => {
        let defaultLayer = [
            {
                id: 1,
                label: "Title",
                name: "title",
                type: "title",
            }
        ]
        dispatch(setLayer(defaultLayer))
    }


    const saveDataState = (res: any) => {
        if (res?.error?.message) {
            toast({
                title: "Error",
                description: res?.error?.message,
                variant: "destructive",
            });
            return;
        }
        console.log(res.data);
        setDataLayer(res.data.layer);
        setDataForm(res.data.detail);
        setDatabaseIdState(res.data.databaseId);
    }


    useEffect(() => {
        const _id = searchParams.get("id");
        if (_id && testMode) {
            dispatch(
                setInformation({
                    id: _id,
                })
            );
            if (!supabase) return;
            try {
                supabase
                    .from("form")
                    .select("layer,detail,databaseId")
                    .eq("id", _id)
                    .single()
                    .then((res: any) => {
                        saveDataState(res)
                        dispatch(setLayer(res.data.layer));
                        dispatch(setDatabaseId(res.data.databaseId));
                        dispatch(setAllForm(res.data.detail));
                    });
            } catch (error) {
                console.log(error);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, searchParams, supabase, testMode, toast]);

    useEffect(() => {
        //supabase
        if (id != null) {
            if (!supabase) return;
            try {
                supabase
                    .from("form")
                    .select("layer,detail,databaseId")
                    .eq("id", id)
                    .single()
                    .then((res: any) => {
                        saveDataState(res)
                    });
            } catch (error) {
                console.log(error);
            }

            return;
        }
        setDataForm(form);
        setDataLayer(layer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form, id, layer, supabase]);

    const checkRequire = () => {
        let error: any = {};
        let check = true;
        for (const [key, value] of Object.entries(inputForm) as any) {
            if (value.require && value.value === "") {
                error[key] = "This field is required";
                check = false;
            }
        }
        console.log(error);
        setError(error);
        return check;
    };

    const submitForm = async (e: any) => {
        e.preventDefault();
        if (!checkRequire()) {
            return;
        }

        if (testMode) {
            console.log("test mode");
            return;
        }

        if (databaseId == null) {
            return;
        }
        setLoading(true);
        //loop get all value
        console.log("submit form");

        //loop inputForm create object properties for notion page body
        let properties: any = {};
        console.log(inputForm);
        for (const [key, value] of Object.entries(inputForm) as any) {
            if (value.type === "title" || value.type === "rich_text") {
                properties[key] = {
                    [value.type]: [
                        {
                            text: {
                                content: value.value as string,
                            },
                        },
                    ],
                    type: value.type,
                };
            } else if (value.type === "select" || value.type === "status") {
                properties[key] = {
                    [value.type]: {
                        name: value.value as string,
                    },
                    type: value.type,
                };
            } else if (value.type === "date") {
                properties[key] = {
                    [value.type]: {
                        start: value.value as string,
                    },
                    type: value.type,
                };
            } else if (value.type === "files") {
                properties[key] = {
                    [value.type]: [
                        {
                            //random file name
                            name: `${Math.random().toString(36).substring(2, 15)}`,
                            external: {
                                url: value.value as string,
                            },
                        },
                    ],
                    type: value.type,
                };
            } else if (value.type === "multi_select") {
                properties[key] = {
                    [value.type]: [
                        ...value.value.map((item: any) => {
                            return {
                                name: item,
                            };
                        }),
                    ],
                    type: value.type,
                };
            } else if (value.type === "number") {
                properties[key] = {
                    [value.type]: parseInt(value.value),
                    type: value.type,
                };
            } else {
                properties[key] = {
                    [value.type]: value.value,
                    type: value.type,
                };
            }
        }

        updateDatabase(databaseId, properties)
            .then((e) => {
                if (e?.error) {
                    //toast error
                    toast({
                        title: "Error",
                        description: e?.error,
                        variant: "destructive",
                    });
                }
            })
            .finally(() => {
                setSuccessSubmit(true);
                setLoading(false);
            });
    };

    return (
        <>
            {successSubmit ? (
                <SuccessPageComponent/>
            ) : (
                <>
                    <h1 className="text-2xl font-bold">{dataForm?.title}</h1>
                    {dataForm?.description && (
                        <p className="text-gray-400 text-sm whitespace-pre-line pt-1 pb-4">
                            {dataForm?.description}
                        </p>
                    )}
                    <form onSubmit={submitForm}>
                        {dataLayer?.map((item: any, index: number) => {
                            return (
                                <RenderFormComponent
                                    updateInputForm={updateInputForm}
                                    data={item}
                                    key={index}
                                />
                            );
                        })}
                        <div className="mt-3">
                            <Button
                                disabled={loading}
                                style={{
                                    backgroundColor: dataForm?.button?.color,
                                }}
                                className="px-10"
                            >
                                {loading && (
                                    <Icons.spinner className="animate-spin mr-2 h-5 w-5"/>
                                )}
                                {dataForm?.button?.text || "Submit"}
                            </Button>
                        </div>
                    </form>
                    {/* power by */}
                    <div
                        className="mt-5 text-xs text-gray-400 text-center border-t pt-5 mx-10 border-opacity-10 border-gray-400">
                        <div>
                            Power by{" "}
                            <Link
                                href="https://unclelife.co"
                                target="_blank"
                                className="text-blue-500 hover:underline"
                            >
                                Uncle Life
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default FormMainBox;
