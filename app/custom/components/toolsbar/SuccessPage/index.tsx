"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Trash } from "lucide-react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import ProBadge from "../ProBadge";

const SuccessPageCustomComponent = ({ onChangeHook, form }: any) => {
  const { theme } = useTheme();
  const [customRedirect, setCustomRedirect] = useState(false);

  const handleClickChangeIcon = (icon: any) => {
    onChangeHook(
      {
        ...form?.free,
        successPage: {
          ...form?.free?.successPage,
          ["icon"]: icon.emoji,
        },
      },
      "free"
    );
  };

  const clearIcon = () => {
    onChangeHook(
      {
        ...form?.free,
        successPage: {
          ...form?.free?.successPage,
          ["icon"]: "",
        },
      },
      "free"
    );
  };

  const hideIcon = () => {
    const icon = form?.free?.successPage?.icon === "hide" ? "" : "hide";
    onChangeHook(
      {
        ...form?.free,
        successPage: {
          ...form?.free?.successPage,
          ["icon"]: icon,
        },
      },
      "free"
    );
  };

  const renderTheme = (): Theme => {
    if (theme === "dark") {
      return Theme.DARK;
    }
    if (theme === "light") {
      return Theme.LIGHT;
    }
    return Theme.AUTO;
  };

  return (
    <AccordionItem value="customSuccessPage">
      <AccordionTrigger className={"hover:no-underline"}>
        <div>
          Submission
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col space-y-2">
          <div className="text-xs font-bold">
            ICON <span className="text-red-500">*</span>
          </div>
          <div className={"mt-2 flex space-x-2 items-center"}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={
                    form?.free?.successPage?.icon === "hide" || customRedirect
                  }
                  variant="outline"
                  size="icon"
                >
                  {form?.free?.successPage?.icon &&
                  form?.free?.successPage?.icon !== "hide"
                    ? form?.free?.successPage?.icon
                    : "🎉"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className={"ml-10 w-11/12"}>
                <Tabs defaultValue="emoji" className="w-full">
                  <TabsList>
                    <TabsTrigger value="emoji">Emoji</TabsTrigger>
                    <TabsTrigger value="password">GIFs</TabsTrigger>
                  </TabsList>
                  <TabsContent value="emoji">
                    <EmojiPicker
                      onEmojiClick={handleClickChangeIcon}
                      theme={renderTheme()}
                    />
                  </TabsContent>
                  <TabsContent value="password">SOON</TabsContent>
                </Tabs>
              </PopoverContent>
            </Popover>
            {form?.free?.successPage?.icon &&
              form?.free?.successPage?.icon != "hide" && (
                <Button
                  disabled={customRedirect}
                  onClick={clearIcon}
                  size={"icon"}
                  variant={"outline"}
                >
                  <Trash className={"w-4 h-4"} />
                </Button>
              )}
            {/*    hide*/}
            <Button
              disabled={customRedirect}
              onClick={hideIcon}
              variant="outline"
              size="icon"
            >
              {form?.free?.successPage?.icon === "hide" ? (
                <EyeClosedIcon className={"w-4 h-4"} />
              ) : (
                <EyeOpenIcon className={"w-4 h-4"} />
              )}
            </Button>
          </div>
          <div className={"mt-5"}>
            <div className="text-xs font-bold mb-2">
              TITLE <span className="text-red-500">*</span>
            </div>
            <Input
              placeholder="Thank you!"
              disabled={customRedirect}
              className="focus:outline-none focus-visible:ring-0"
              value={form?.free?.successPage?.title}
              onChange={(e) => {
                console.log(e.target.value);
                onChangeHook(
                  {
                    ...form?.free,
                    successPage: {
                      ...form?.free?.successPage,
                      ["title"]: e.target.value,
                    },
                  },
                  "free"
                );
              }}
            />
          </div>
          <div className={"mt-5"}>
            <div className="text-xs font-bold mb-2">DESCRIPTION</div>
            <RichTextEditor
              disabled={customRedirect}
              value={form?.free?.successPage?.description}
              onChange={(e:any) => {
                onChangeHook(
                  {
                    ...form?.free,
                    successPage: {
                      ...form?.free?.successPage,
                      ["description"]: e,
                    },
                  },
                  "free"
                );
              }}
            />
          </div>
          <div>
            <div className={"flex space-x-3 items-center"}>
              <Switch
                onCheckedChange={(e) => {
                  setCustomRedirect(e);
                }}
              />
              <p className={"font-bold"}>Custom Redirect <ProBadge/></p>
            </div>
            {customRedirect && (
              <div className={"mt-5"}>
                <div className="text-xs font-bold mb-2">URL</div>
                <Input
                  placeholder="https://www.unclelife.co"
                  className="focus:outline-none focus-visible:ring-0"
                  value={form?.pro?.successPage?.redirect}
                  onChange={(e) => {
                    onChangeHook(
                      {
                        ...form?.pro,
                        successPage: {
                          ...form?.pro?.successPage,
                          ["redirect"]: e.target.value,
                        },
                      },
                      "pro"
                    );
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SuccessPageCustomComponent;
