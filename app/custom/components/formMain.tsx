"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import RenderFormComponent from "../components/render/RenderForm";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";
import { updateDatabase } from "@/lib/notionApi";
import { Icons } from "@/components/Icons";
import Link from "next/link";
import {
  setAlert,
  setAllForm,
  setDatabaseId,
  setInformation,
  setLayer,
  setLogic,
  setWorkspaceId,
} from "@/app/redux/slice/formController.slice";
import { useSearchParams } from "next/navigation";
import SuccessPageComponent from "./successPage";
import Image from "next/image";
import { setUserData } from "@/app/redux/slice/userController.slice";
import { convertInputToProperty } from "@/lib/notion";
import { cn } from "@/lib/utils";
import { evaluateGroup } from "@/lib/formController";

const FormMainBox = ({
  id = null,
  testMode = false,
  responseData = null,
}: {
  id?: string | null;
  testMode?: boolean;
  responseData?: any;
}) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();
  const [dataForm, setDataForm] = useState<any>({});
  const [dataLayer, setDataLayer] = useState<any>([]);
  const [dataLayerDefault, setDataLayerDefault] = useState<any>([]);
  const [dataUser, setDataUser] = useState<any>({});
  const [databaseId, setDatabaseIdState] = useState<string>("");
  const { form, layer, workspaceId, logic } = useAppSelector(
    (state) => state.formReducer
  );
  const [loading, setLoading] = useState(false);

  const [inputForm, setInputForm]: any = useState<any>({});
  const [error, setError] = useState<any>({});
  const [successSubmit, setSuccessSubmit] = useState(false);

  const updateInputForm = (value: string, data: any) => {
    setError({
      ...error,
      [data.id]: "",
    });
    if (data.mapTo != undefined) {
      setInputForm({
        ...inputForm,
        [data.mapTo]: {
          value,
          type: data.mapType,
        },
      });
    }

    if (!dataUser?.is_subscribed) {
      return;
    }
    //check condition logic
    logic.forEach((item: any) => {
      if (item.layerId !== data?.id) return;
      let newValue: any = value;
      if (data.type == "number") {
        newValue = parseInt(newValue);
      }

      const conditionMet = evaluateGroup(item.when, newValue);
      const layerId = item?.then?.layerId;

      let shouldBeRequired =
        dataLayerDefault.find((item: any) => item?.id === layerId)?.required ||
        false;
      let shouldBeHidden =
        dataLayerDefault.find((item: any) => item?.id === layerId)?.hidden ||
        false;
      let shouldBeDisabled =
        dataLayerDefault.find((item: any) => item?.id === layerId)?.disabled ||
        false;

      console.log("conditionMet", conditionMet);

      if (conditionMet) {
        if (item.then?.type === "required") {
          shouldBeRequired = true;
        } else if (item.then?.type === "hidden") {
          shouldBeHidden = true;
        } else if (item.then?.type === "visible") {
          shouldBeHidden = false;
        } else if (item.then?.type === "optional") {
          shouldBeRequired = false;
        } else if (item.then?.type === "disabled") {
          shouldBeDisabled = true;
        } else if (item.then?.type === "enabled") {
          shouldBeDisabled = false;
        }
        if (layerId) {
          const layer = dataLayer?.map((layerItem: any) => {
            if (layerItem?.id === layerId) {
              return {
                ...layerItem,
                required: shouldBeRequired,
                hidden: shouldBeHidden,
                disable: shouldBeDisabled,
              };
            }
            return layerItem;
          });
          console.log("layer", layer);
          setDataLayer(layer);
        }
      } else {
        // setDataLayer(dataLayerDefault);
        // check layer Id and set it to default by dataLayerDefault
        if (layerId) {
          const layer = dataLayer?.map((layerItem: any) => {
            if (layerItem?.id === layerId) {
              return {
                ...layerItem,
                required:
                  dataLayerDefault.find((item: any) => item?.id === layerId)
                    ?.required || false,
                hidden:
                  dataLayerDefault.find((item: any) => item?.id === layerId)
                    ?.hidden || false,
                disable:
                  dataLayerDefault.find((item: any) => item?.id === layerId)
                    ?.disable || false,
              };
            }
            return layerItem;
          });
          console.log("layer", layer);
          setDataLayer(layer);
        }
      }
    });
  };

  useEffect(() => {
    if (layer.length === 0) {
      setDefaultInputFormLayer();
      return;
    }
    setDataLayer(layer);
    setDataLayerDefault(layer);
    if (testMode) {
      setDataUser({
        is_subscribed: true,
      });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layer]);

  // ! check pro-plan
  useEffect(() => {
    // dataForm?.pro.customizations is object filter true
    let listAlert: any = [];
    const filterCustomization = Object.keys(
      dataForm?.pro?.customizations || {}
    ).filter((key) => {
      return (
        dataForm?.pro?.customizations[key] !== false &&
        dataForm?.pro?.customizations[key] !== null &&
        dataForm?.pro?.customizations[key] !== undefined &&
        dataForm?.pro?.customizations[key].length != 0
      );
    });

    const filterSuccessPage = Object.keys(
      dataForm?.pro?.successPage || {}
    ).filter((key) => {
      return (
        dataForm?.pro?.successPage[key] !== false &&
        dataForm?.pro?.successPage[key] !== null &&
        dataForm?.pro?.successPage[key] !== undefined &&
        dataForm?.pro?.successPage[key].length != 0
      );
    });

    //filterProLayer dataLayer pro is not empty
    const filterProLayer = dataLayer?.filter((item: any) => {
      return (
        item?.pro !== undefined &&
        item?.pro !== null &&
        Object.keys(item?.pro).length !== 0 &&
        Object.keys(item?.pro).filter((key) => {
          return (
            item?.pro[key] !== false &&
            item?.pro[key] !== null &&
            item?.pro[key] !== undefined &&
            item?.pro[key].length != 0
          );
        }).length !== 0
      );
    });

    const filterTypeProLayer = dataLayer?.filter((item: any) => {
      return ["files", "textBlock"].includes(item?.type);
    });

    let checkLogic: any = [];
    if (logic.length != 0) {
      checkLogic = ["logic"];
    }

    listAlert = [
      ...filterCustomization,
      ...filterSuccessPage,
      ...filterProLayer,
      ...filterTypeProLayer,
      ...checkLogic,
    ];

    dispatch(setAlert(listAlert));
  }, [dataForm, dataLayer, dispatch, logic]);

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
      },
    ];
    dispatch(setLayer(defaultLayer));
  };

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
    setDataLayerDefault(res.data.layer);
    setDataForm(res.data.detail);
    setDatabaseIdState(res.data.databaseId);
    dispatch(setLayer(res.data.layer));
    dispatch(setDatabaseId(res.data.databaseId));
    dispatch(setAllForm(res.data.detail));
    dispatch(setLogic(res?.data?.logic));
    if (!workspaceId) {
      dispatch(setWorkspaceId(res.data.detail.workspaceId));
    }
    if (testMode) {
      setDataUser({
        is_subscribed: true,
      });
      return;
    }
    setDataUser(res.data.user_id);
    dispatch(setUserData(res.data.user_id));
  };

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
          .select("layer,detail,databaseId,user_id,logic")
          .eq("id", _id)
          .single()
          .then((res: any) => {
            // console.log("supabase", res)
            saveDataState(res);
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
      saveDataState(responseData);
      return;
    }
    setDataForm(form);
    setDataLayer(layer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, id, layer, supabase]);

  const checkRequire = () => {
    let error: any = {};
    let check = true;

    //check if testMode
    if (testMode) {
      return false;
    }

    dataLayer?.map((item: any) => {
      if (item?.required) {
        if (
          inputForm[item?.mapTo]?.value?.length === 0 ||
          inputForm[item?.mapTo]?.value === "" ||
          inputForm[item?.mapTo]?.value === null ||
          inputForm[item?.mapTo]?.value === undefined
        ) {
          error[item?.id] = "This field is required";
          check = false;
        }
        return;
      }
      //check email
      if (
        item?.type === "email" &&
        inputForm[item?.mapTo]?.value?.length != 0 &&
        inputForm[item?.mapTo]?.value != undefined
      ) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputForm[item?.mapTo]?.value)) {
          error[item?.id] = "Invalid email";
          check = false;
        }
      }
      //validate phone number
      if (
        item?.type === "phone_number" &&
        inputForm[item?.mapTo]?.value?.length != 0 &&
        inputForm[item?.mapTo]?.value != undefined
      ) {
        if (!/^\d+$/.test(inputForm[item?.mapTo]?.value)) {
          error[item?.id] = "Invalid phone number";
          check = false;
        }
      }
    });

    console.log(error);

    setError(error);
    return check;
  };

  /**
   * Submits the form data to the database and updates the database with the new values.
   * @param e - The event object.
   * @returns void
   */
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
    const properties: any = await convertInputToProperty(
      inputForm,
      supabase,
      toast
    );

    updateDatabase(databaseId, properties, dataUser.id, id)
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
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSuccessSubmit(true);
        setLoading(false);
        //check redirect
        if (
          dataForm?.pro?.successPage?.redirect &&
          dataForm?.pro?.successPage?.redirect.length != 0
        ) {
          window.location.href = dataForm?.pro?.successPage?.redirect;
        }
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
  };

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
  };

  return (
    <>
      {dataForm?.pro?.customizations?.css && dataUser?.is_subscribed && (
        <style jsx global>{`
          ${dataForm?.pro?.customizations?.css}
        `}</style>
      )}
      {successSubmit ? (
        <SuccessPageComponent />
      ) : (
        <>
          <div className={cn("absolute w-full left-0")}>
            {/*cover image*/}
            {dataForm?.pro?.customizations?.coverPicture &&
              dataUser?.is_subscribed && (
                <div className="w-full h-64 bg-cover bg-center bg-no-repeat relative">
                  <Image
                    src={dataForm?.pro?.customizations?.coverPicture as string}
                    alt={"cover image"}
                    fill
                    className={"w-full h-full object-cover"}
                  />
                </div>
              )}
            {/* logo */}
            {dataForm?.pro?.customizations?.logoPicture &&
              dataUser?.is_subscribed && (
                <div className="flex w-full">
                  <div className="mx-auto w-full">
                    <div className="mx-auto max-w-[700px] w-full h-32">
                      <div
                        className={cn(
                          `h-32 w-32 bg-cover bg-center bg-no-repeat relative rounded-full overflow-hidden mx-4`,
                          dataForm?.pro?.customizations?.coverPicture
                            ? "-mt-[70px]"
                            : "mt-4"
                        )}
                      >
                        <Image
                          src={
                            dataForm?.pro?.customizations?.logoPicture as string
                          }
                          alt={"logo image"}
                          fill
                          className={"w-full h-full object-cover"}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className=" w-full rounded-sm">
                    <div className="flex justify-start w-full">
                      <div
                        className={cn(
                          `h-32 w-32 bg-cover bg-center bg-no-repeat relative rounded-full overflow-hidden mx-4`,
                          dataForm?.pro?.customizations?.coverPicture
                            ? "-mt-[70px]"
                            : "mt-4"
                        )}
                      >
                        <Image
                          src={
                            dataForm?.pro?.customizations?.logoPicture as string
                          }
                          alt={"logo image"}
                          fill
                          className={"w-full h-full object-cover"}
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
              )}
          </div>
          {dataForm?.pro?.customizations?.coverPicture &&
          dataUser?.is_subscribed &&
          dataForm?.pro?.customizations?.logoPicture &&
          dataUser?.is_subscribed ? (
            <div className="h-64 mb-14"></div>
          ) : dataForm?.pro?.customizations?.coverPicture &&
            dataUser?.is_subscribed ? (
            <div className="h-52 mb-14"></div>
          ) : dataForm?.pro?.customizations?.logoPicture &&
            dataUser?.is_subscribed ? (
            <div className="h-24 mb-14"></div>
          ) : (
            <div></div>
          )}
          <div className={"p-5"}>
            <h1 className="text-4xl font-extrabold mb-5">{dataForm?.title}</h1>
            {dataForm?.description && (
              <div
                dangerouslySetInnerHTML={{ __html: dataForm?.description }}
                className="text-muted-foreground prose text-sm whitespace-pre-line pt-1 pb-4"
              ></div>
            )}
            <form
              onSubmit={submitForm}
              className="flex flex-wrap w-[102%] -ml-2"
              noValidate
            >
              {dataLayer?.map((item: any, index: number) => {
                return (
                  <RenderFormComponent
                    updateInputForm={updateInputForm}
                    data={item}
                    error={error[item?.id]}
                    dataUser={dataUser}
                    key={index}
                  />
                );
              })}
              <div
                className="mt-3 flex w-full px-2"
                style={{
                  justifyContent: dataForm?.button?.position,
                }}
              >
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
                    <Icons.spinner className="animate-spin mr-2 h-5 w-5" />
                  )}
                  {dataForm?.button?.text || "Submit"}
                </Button>
              </div>
            </form>
            {/* power by */}
            {!(
              dataForm?.pro?.customizations?.hideBranding_pro &&
              dataUser?.is_subscribed
            ) && (
              <div className="mt-5 text-xs text-gray-400 text-center border-t pt-5 mx-10 border-opacity-10 border-gray-400">
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
            )}
          </div>
        </>
      )}
    </>
  );
};

export default FormMainBox;
