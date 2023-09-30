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

const DateRender = ({ data, updateInputForm, error, isSubscribed }: any) => {
  const [date, setDate] = React.useState<Date>();
  return data.hidden ? (
    <></>
  ) : (
    <>
      <Label htmlFor={data.label} className="text-lg font-bold cursor-text">
        <span
          className="inline-block"
          dangerouslySetInnerHTML={{
            __html: data?.label,
          }}
        ></span>
        {data.required && <RequiredStar />}
      </Label>
      {(data?.helpPositionAboveInput ||
        data?.helpPositionAboveInput == undefined) && (
        <p
          className="text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: data?.help,
          }}
        ></p>
      )}

      <Popover>
        <PopoverTrigger disabled={data.disable} asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal shadow-sm",
              !date && "text-muted-foreground",
              error && "border border-red-500"
            )}
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
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: data?.help,
            }}
          ></p>
        )}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </>
  );
};

export default DateRender;
