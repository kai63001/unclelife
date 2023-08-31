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
import Image from "next/image";
import {decode} from 'base64-arraybuffer'


const FormMainBox = ({
                         id = null,
                         testMode = false,
                         responseData = null
                     }: {
    id?: string | null;
    testMode?: boolean;
    responseData?: any;
}) => {
    const {toast} = useToast();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const supabase = createClientComponentClient();
    const [dataForm, setDataForm] = useState<any>({});
    const [dataLayer, setDataLayer] = useState<any>([]);
    const [dataUser, setDataUser] = useState<any>({});
    const [databaseId, setDatabaseIdState] = useState<string>("");
    const {form, layer} = useAppSelector((state) => state.formReducer);
    const [loading, setLoading] = useState(false);

    const [inputForm, setInputForm]: any = useState<any>({});
    const [error, setError] = useState<any>({});
    const [successSubmit, setSuccessSubmit] = useState(false);

    const updateInputForm = (value: string, data: any) => {
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
            setDefaultInputFormLayer()
            return;
        }
        if (testMode) {
            setDataUser({
                is_subscribed: true
            })
            return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layer])

    useEffect(() => {
        //check Using pro-plan
        if (dataForm?.pro?.customizations?.hideBranding == true) {
            console.log('use pro')
        }

    }, [dataForm])

    const setDefaultInputFormLayer = () => {
        let defaultLayer = [
            {
                id: 1,
                label: "Subject",
                name: "Subject",
                type: "title",
            },
            {
                id: 2,
                label: "Email",
                name: "Email",
                type: "email",
            },
            {
                id: 3,
                label: "Description",
                name: "Description",
                type: "rich_text",
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
        setDataLayer(res.data.layer);
        setDataForm(res.data.detail);
        setDatabaseIdState(res.data.databaseId);
        if (testMode) {
            setDataUser({
                is_subscribed: true
            })
            return
        }
        setDataUser(res.data.user_id);
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
                    .select("layer,detail,databaseId,user_id")
                    .eq("id", _id)
                    .single()
                    .then((res: any) => {
                        // console.log("supabase", res)
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
        // this is production mode
        if (id != null && responseData != null) {
            saveDataState(responseData)
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
            // console.log("test mode");
            return;
        }

        if (databaseId == null) {
            return;
        }
        setLoading(true);
        //loop get all value
        // console.log("submit form");

        //loop inputForm create object properties for notion page body
        let properties: any = {};
        // console.log(inputForm);
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
                let url = ''
                if (value.value === '') {
                    return;
                }
                // value.value is base64 upload to supabase
                const base64 = value.value.split('__name__')[0]
                const file = base64.split(',')[1]
                const name = value.value.split('__name__')[1]
                const contentType = base64.split(';')[0].split(':')[1]
                const randomName = `${Math.random().toString(36).substring(2, 15)}_${name}`
                const {data, error} = await supabase.storage
                    .from("files")
                    .upload(randomName, decode(file), {
                        cacheControl: "3600",
                        contentType: contentType,
                    });
                if (error) {
                    toast({
                        title: "Error",
                        description: error.message,
                        variant: "destructive",
                    });
                    return;
                }
                //get url
                const uri = data?.path;
                const bucket = 'files';
                url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${uri}`;

                properties[key] = {
                    [value.type]: [
                        {
                            //random file name
                            name: randomName,
                            external: {
                                url: url as string,
                            },
                        },
                    ],
                    type: value.type,
                };
            } else if (value.type === "multi_select") {
                let newValue = value.value;
                if (typeof value.value === "string") {
                    newValue = [value.value];
                }
                properties[key] = {
                    [value.type]: [
                        ...newValue?.map((item: any) => {
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

        updateDatabase(databaseId, properties, dataUser.id)
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

    //calculate color if color is dark change text color to white
    const calculateColor = (color: string) => {
        const rgb: any = hexToRgb(color);
        if (rgb) {
            const o = Math.round(
                (parseInt(rgb.r) * 299 +
                    parseInt(rgb.g) * 587 +
                    parseInt(rgb.b) * 114) /
                1000
            );
            return o > 125 ? "black" : "white";
        }
        return "black";
    }

    const hexToRgb = (hex: string) => {
        if (hex?.length === 4) {
            hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null;
    }


    return (
        <>
            {successSubmit ? (
                <SuccessPageComponent/>
            ) : (
                <>
                    {/*cover image*/}
                    {(dataForm?.pro?.customizations?.coverPicture && dataUser?.is_subscribed) && (
                        <div className="w-full h-64 bg-cover bg-center bg-no-repeat relative">
                            <Image src={dataForm?.pro?.customizations?.coverPicture as string} alt={'cover image'}
                                   fill
                                   className={'w-full h-full object-cover'}/>
                        </div>
                    )}
                    <div className={'p-5'}>
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
                                        dataUser={dataUser}
                                        key={index}
                                    />
                                );
                            })}
                            <div className="mt-3 flex" style={{
                                justifyContent: dataForm?.button?.position
                            }}>
                                <Button
                                    disabled={loading}
                                    style={{
                                        backgroundColor: dataForm?.button?.color,
                                        color: calculateColor(dataForm?.button?.color),
                                        //     position
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
                        {
                            !(dataForm?.pro?.customizations?.hideBranding && dataUser?.is_subscribed) && (
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
                            )
                        }
                    </div>
                </>
            )}
        </>
    );
};

export default FormMainBox;
