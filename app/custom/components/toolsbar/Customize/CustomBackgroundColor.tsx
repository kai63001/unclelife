"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const CustomBackgroundColorForm = ({ onChangeHook, form }: any) => {
  const updateBgColor = (e: any, mode: any = "light", type:any ='backgroundColor') => {
    onChangeHook(
      {
        ...form?.pro,
        customizations: {
          ...form?.pro?.customizations,
          [mode]: {
            ...form?.pro?.customizations?.[mode],
            [type]: e.target.value,
          },
        },
      },
      "pro"
    );
  };

  return (
    <div>
      <Label className="pb-2 font-bold uppercase">
        Custom Color
      </Label>
      <div className="flex items-center space-x-2 mb-2">
        <Switch
          id="enableBackgroundColor"
          onCheckedChange={(e) => {
            onChangeHook(
              {
                ...form?.pro,
                customizations: {
                  ...form?.pro?.customizations,
                  light: {
                    ...form?.pro?.customizations?.light,
                    enableBackgroundColor: e,
                  },
                },
              },
              "pro"
            );
          }}
          checked={form?.pro?.customizations?.light?.enableBackgroundColor}
        />
        <Label htmlFor="enableBackgroundColor">
          Enable Custom Color
        </Label>
      </div>
      {form?.pro?.customizations?.light?.enableBackgroundColor && (
        <div className="relative z-50">
          <Label className="pb-2 flex space-x-3 items-center">
            <div
              style={{
                backgroundColor:
                  form?.pro?.customizations?.light?.backgroundColor,
              }}
              className="w-8 h-8 rounded-sm border border-gray-300 mr-2"
            ></div>
            Background Color
            <Input
              type="color"
              value={form?.pro?.customizations?.light?.backgroundColor}
              onChange={(e) => {
                e.preventDefault();
                updateBgColor(e, "light");
              }}
              className="h-0 w-0 absolute opacity-0"
            />
          </Label>
          <Label className="pb-2 flex space-x-3 items-center">
            <div
              style={{
                backgroundColor:
                  form?.pro?.customizations?.light?.inputColor,
              }}
              className="w-8 h-8 rounded-sm border border-gray-300 mr-2"
            ></div>
            Input Color
            <Input
              type="color"
              value={form?.pro?.customizations?.light?.inputColor}
              onChange={(e) => {
                e.preventDefault();
                updateBgColor(e, "light",'inputColor');
              }}
              className="h-0 w-0 absolute opacity-0"
            />
          </Label>
          <Label className="pb-2 flex space-x-3 items-center">
            <div
              style={{
                backgroundColor:
                  form?.pro?.customizations?.light?.primaryColor,
              }}
              className="w-8 h-8 rounded-sm border border-gray-300 mr-2"
            ></div>
            Primary Color
            <Input
              type="color"
              value={form?.pro?.customizations?.light?.primaryColor}
              onChange={(e) => {
                e.preventDefault();
                updateBgColor(e, "light",'primaryColor');
              }}
              className="h-0 w-0 absolute opacity-0"
            />
          </Label>
          <Label className="pb-2 flex space-x-3 items-center">
            <div
              style={{
                backgroundColor:
                  form?.pro?.customizations?.light?.secondaryColor,
              }}
              className="w-8 h-8 rounded-sm border border-gray-300 mr-2"
            ></div>
            Secondary Color
            <Input
              type="color"
              value={form?.pro?.customizations?.light?.secondaryColor}
              onChange={(e) => {
                e.preventDefault();
                updateBgColor(e, "light",'secondaryColor');
              }}
              className="h-0 w-0 absolute opacity-0"
            />
          </Label>
        </div>
      )}
      <p className="text-muted-foreground text-xs my-1">
        If custom color enable dark mode will be disabled
      </p>
    </div>
  );
};
