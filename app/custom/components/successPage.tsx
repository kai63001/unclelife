"use client";
import Link from "next/link";
import { useAppSelector } from "@/app/redux/hook";

const SuccessPageComponent = ({ testMode = false }: any) => {
  const { form: dataForm } = useAppSelector((state) => state.formReducer);
  const { data: dataUser } = useAppSelector((state) => state.userReducer);

  return (
    <div className="flex items-center justify-center">
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
          <h1 className="text-3xl font-bold text-muted-foreground">
            {dataForm?.free?.successPage?.title != undefined &&
            (dataUser?.is_subscribed || testMode)
              ? dataForm?.free?.successPage?.title
              : "Thank you!"}
          </h1>
          <p
            className="mt-2 text-gray-600 prose"
            dangerouslySetInnerHTML={{
              __html:
                dataForm?.free?.successPage?.description != undefined &&
                (dataUser?.is_subscribed || testMode)
                  ? dataForm?.free?.successPage?.description
                  : "Your form has been submitted.",
            }}
          ></p>
          {!(
            dataForm?.pro?.customizations?.hideBranding_pro &&
            (dataUser?.is_subscribed || testMode)
          ) && (
            <p className="mt-5 text-gray-400 text-sm">
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
