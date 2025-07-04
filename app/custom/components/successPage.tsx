"use client";
import Link from "next/link";
import { useAppSelector } from "@/app/redux/hook";
import { Button } from "@/components/ui/button";
import { calculateTextColor } from "@/lib/formController";

const SuccessPageComponent = ({ testMode = false, setSuccessSubmit }: any) => {
  const { form: dataForm } = useAppSelector((state) => state.formReducer);
  const { data: dataUser } = useAppSelector((state) => state.userReducer);

  return (
    <div
      className="flex items-center justify-center"
      style={{
        backgroundColor:
          dataForm?.pro?.customizations?.light?.enableBackgroundColor &&
          dataUser?.is_subscribed
            ? dataForm?.pro?.customizations?.light?.backgroundColor
            : null,
      }}
    >
      <div className="p-6 ">
        {!(
          dataForm?.free?.successPage?.icon == "hide" &&
          (dataUser?.is_subscribed || testMode)
        ) && (
          <div className="flex items-center justify-center">
            <p className="text-7xl">
              {dataForm?.free?.successPage?.icon &&
              (dataUser?.is_subscribed || testMode)
                ? dataForm?.free?.successPage?.icon
                : "🎉"}
            </p>
          </div>
        )}
        <div className="flex flex-col items-center justify-center mt-5">
          <h1
            style={{
              ...(dataForm?.pro?.customizations?.light?.enableBackgroundColor &&
                dataUser?.is_subscribed &&
                dataForm?.pro?.customizations?.light?.backgroundColor && {
                  color: calculateTextColor(
                    dataForm?.pro?.customizations?.light?.backgroundColor
                  ),
                }),
              // color:
              //   dataForm?.pro?.customizations?.light?.enableBackgroundColor &&
              //   dataUser?.is_subscribed
              //     ? calculateTextColor(
              //         dataForm?.pro?.customizations?.light?.backgroundColor
              //       )
              //     : undefined,
            }}
            className="text-3xl font-bold text-muted-foreground"
          >
            {dataForm?.free?.successPage?.title != undefined &&
            (dataUser?.is_subscribed || testMode)
              ? dataForm?.free?.successPage?.title
              : "Thank you!"}
          </h1>
          <p
            className="mt-2 prose"
            dangerouslySetInnerHTML={{
              __html:
                dataForm?.free?.successPage?.description != undefined &&
                (dataUser?.is_subscribed || testMode)
                  ? dataForm?.free?.successPage?.description
                  : "Your form has been submitted.",
            }}
          ></p>
          {dataForm?.free?.successPage?.refill && (
            <Button
              className="mt-2"
              onClick={() => {
                setSuccessSubmit(false);
              }}
            >
              {dataForm?.free?.successPage?.refillText || "Refill Form"}
            </Button>
          )}

          {!(
            dataForm?.pro?.customizations?.hideBranding_pro &&
            (dataUser?.is_subscribed || testMode)
          ) && (
            <p
              style={{
                ...(dataForm?.pro?.customizations?.light?.enableBackgroundColor &&
                  dataForm?.pro?.customizations?.light?.backgroundColor && {
                    color: calculateTextColor(
                      dataForm?.pro?.customizations?.light?.backgroundColor
                    ),
                  }),
              }}
              className="mt-5 text-gray-400 text-sm"
            >
              If you want to create your form, go to
              <Link href="https://www.unclelife.co" className="ml-1 underline">
                unclelife.co
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessPageComponent;
