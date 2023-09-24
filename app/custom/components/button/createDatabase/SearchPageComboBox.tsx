"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

const SearchPageComboBox = ({ listPage, setPageId }: any) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex space-x-3">
            {value &&
              listPage.find((page: any) => page.id === value)?.icon.type ===
                "emoji" && (
                <span className="mr-2">
                  {listPage.find((page: any) => page.id === value)?.icon.emoji}
                </span>
              )}
            {listPage.find((page: any) => page.id === value)?.icon.type ===
              "external" && (
              <Image
                src={
                  listPage.find((page: any) => page.id === value)?.icon.external
                }
                alt={`icon external ${
                  listPage.find((page: any) => page.id === value)?.title
                }`}
                width={16}
                height={16}
                className="mr-2"
              />
            )}
            {listPage.find((page: any) => page.id === value)?.icon.type ===
              "file" && (
              <Image
                src={listPage.find((page: any) => page.id === value)?.icon.file}
                alt={`icon file ${
                  listPage.find((page: any) => page.id === value)?.title
                }`}
                width={16}
                height={16}
                className="mr-2"
              />
            )}

            {value
              ? listPage.find((page: any) => page.id === value)?.title
              : "Select a Notion Page"}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[560px] p-0">
        <Command className="w-full">
          <CommandInput placeholder="Search Notion Page..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {listPage.map((page: any) => (
              <CommandItem
                key={page.id}
                onSelect={() => {
                  const currentValue = page.id;
                  setPageId(currentValue);
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === page.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {/* icon */}
                {page.icon.type === "emoji" && (
                  <span className="mr-2">{page.icon.emoji}</span>
                )}
                {page.icon.type === "external" && (
                  <Image
                    src={page.icon.external}
                    alt={`icon external ${page.title}`}
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                )}
                {page.icon.type === "file" && (
                  <Image
                    src={page.icon.file}
                    alt={`icon file ${page.title}`}
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                )}

                {page.title}
                <span className="hidden">{page.id}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchPageComboBox;
