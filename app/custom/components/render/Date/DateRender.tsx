"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import RequiredStar from "../RequireStar";
import { useAppSelector } from "@/app/redux/hook";
import { calculateTextColor } from "@/lib/formController";

const DateRender = ({ data, updateInputForm, error, isSubscribed }: any) => {
  const { form } = useAppSelector((state) => state.formReducer);
  const [date, setDate] = React.useState<Date>();
  return data.hidden ? (
    <></>
  ) : (
    <div className="relative mb-2">
      {data?.pro?.hideFieldName && isSubscribed ? null : (
        <Label htmlFor={data.label} className="text-lg font-bold cursor-text">
          <span
            className="inline-block"
            dangerouslySetInnerHTML={{
              __html: data?.label,
            }}
          ></span>
          {data.required && <RequiredStar />}
        </Label>
      )}
      {(data?.helpPositionAboveInput ||
        data?.helpPositionAboveInput == undefined) && (
        <p
          className="text-muted-foreground text-sm my-2"
          dangerouslySetInnerHTML={{
            __html: data?.help,
          }}
        ></p>
      )}
      {data.required && data?.pro?.hideFieldName && isSubscribed && (
        <div className="absolute -top-2 -right-2">
          <RequiredStar/>
        </div>
      )}
      <Popover>
        <PopoverTrigger disabled={data.disable} asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal shadow-sm hover:shadow-md",
              !date && "text-muted-foreground",
              error && "border border-red-500"
            )}
            style={{
              backgroundColor:
                form?.pro?.customizations?.light?.enableBackgroundColor &&
                isSubscribed
                  ? form?.pro?.customizations?.light?.inputColor
                  : null,
              color:
                form?.pro?.customizations?.light?.enableBackgroundColor &&
                isSubscribed
                  ? calculateTextColor(form?.pro?.customizations?.light?.inputColor)
                  : undefined,
            }}
          >
            {(data?.pro?.placeholder && isSubscribed
              ? data?.pro?.placeholder
              : "") && <CalendarIcon className="mr-2 h-4 w-4" />}
            {date ? (
              format(date, "PPP")
            ) : (
              <span>
                {data?.pro?.placeholder && isSubscribed
                  ? data?.pro?.placeholder
                  : ""}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
          <Select
            required={data.required}
            onValueChange={(value) => {
              setDate(addDays(new Date(), parseInt(value)));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">In 3 days</SelectItem>
              <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-md border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(e) => {
                setDate(e);
                updateInputForm(e, data);
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
      {!data?.helpPositionAboveInput &&
        data?.helpPositionAboveInput != undefined && (
          <p
            className="text-muted-foreground text-sm my-2"
            dangerouslySetInnerHTML={{
              __html: data?.help,
            }}
          ></p>
        )}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default DateRender;
