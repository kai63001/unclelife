"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import RichTextEditor from "@/components/RichTextEditor";
import { useToast } from "@/components/ui/use-toast";
import RequiredStar from "../../render/RequireStar";
import { setNotification } from "@/app/redux/slice/formController.slice";
import { updateNotification } from "@/lib/formApi";
import { Switch } from "@/components/ui/switch";

const SendEmail = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { layer, notification, infomation } = useAppSelector(
    (state) => state.formReducer
  );
  const dispatch = useAppDispatch();
  const [sendTo, setSendTo] = useState(
    notification?.respondentEmail?.sendTo || undefined
  );
  const [replyTo, setReplyTo] = useState(
    notification?.respondentEmail?.replyTo || ""
  );
  const [senderName, setSenderName] = useState(
    notification?.respondentEmail?.senderName || "UncleLife"
  );
  const [emailSubject, setEmailSubject] = useState(
    notification?.respondentEmail?.emailSubject ||
      "Your Submission Has Been Recorded!"
  );
  const [emailContent, setEmailContent] = useState(
    notification?.respondentEmail?.emailContent ||
      `<p>Hey there! 😁</p>
  <p>Just letting you know that UncleLife has successfully received your form submission.</p>`
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //validate sendTo required  replyTo is email senderName emailSubject emailContent required
    if (!sendTo || !senderName || !emailSubject || !emailContent) {
      toast({
        title: "Error",
        description: "Please fill all required field",
        variant: "destructive",
      });
      return;
    }
    //validate replyTo is email when not empty
    if (replyTo && !validateEmail(replyTo)) {
      toast({
        title: "Error",
        description: "Reply To must be email",
        variant: "destructive",
      });
      return;
    }
    if (loading) {
      return;
    }
    setLoading(true);
    //set notification
    dispatch(
      setNotification({
        ...notification,
        respondentEmail: {
          ...notification?.respondentEmail,
          sendTo,
          replyTo,
          senderName,
          emailSubject,
          emailContent,
        },
      })
    );
    if (infomation?.id) {
      const data = await updateNotification(infomation?.id, {
        ...notification,
        respondentEmail: {
          ...notification?.respondentEmail,
          sendTo,
          replyTo,
          senderName,
          emailSubject,
          emailContent,
        },
      });
      console.log(data);
      //update form
    }
    toast({
      title: "Success",
      description: "Notification has been saved.",
    });
    setLoading(false);
  };

  const validateEmail = (email: string) => {
    //with include @
    return /\S+@\S+\.\S+/.test(email);
  };

  const changeEnable = (event: any) => {
    dispatch(
      setNotification({
        ...notification,
        respondentEmail: {
          ...notification?.respondentEmail,
          enable: event,
        },
      })
    );
  };

  const enable = notification?.respondentEmail?.enable;

  return (
    <ScrollArea className="pt-2 -mt-2 max-h-[87vh]">
      {!enable && (
        <div className="flex justify-start items-center space-x-2">
          <Switch
            onCheckedChange={changeEnable}
            checked={enable}
            id="enableOne"
          />
          <Label htmlFor="enableOne">Enable Email Notification</Label>
        </div>
      )}
      {enable && (
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground mb-3 block">
            After someone fills out your form on UncleLife, you can send them an
            email. This can be a thank you note or a confirmation of their
            submission. You can also send yourself an email when someone submits
          </span>
          <form onSubmit={handleSubmit} className="w-full max-w-lg">
            {layer?.filter((item) => item.type == "email")?.length == 0 && (
              <Alert className="mb-4" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  You need to add email field to your form before using this
                  feature.
                </AlertDescription>
              </Alert>
            )}
            <div className="flex flex-wrap space-y-2 -mx-3 mb-6">
              <div className="w-full px-3 mb-6 md:mb-0">
                <Label htmlFor="sendTo">
                  Send To:
                  <RequiredStar />
                </Label>
                <Select
                  onValueChange={(e: any) => {
                    setSendTo(e);
                  }}
                  value={sendTo}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Email Field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {layer?.map((item: any, index: number) => {
                        if (item.type == "email") {
                          return (
                            <SelectItem key={index} value={item?.id?.toString()}>
                              <span
                                className="overflow-hidden h-5 text-ellipsis"
                                dangerouslySetInnerHTML={{
                                  __html: item.label,
                                }}
                              ></span>
                            </SelectItem>
                          );
                        }
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <Label htmlFor="replyTo">Reply To:</Label>
                <Input
                  id="replyTo"
                  type="email"
                  placeholder="example@example.com"
                  value={replyTo}
                  onChange={(event) => setReplyTo(event.target.value)}
                />
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <Label htmlFor="senderName">
                  Sender Name:
                  <RequiredStar />
                </Label>
                <Input
                  id="senderName"
                  type="text"
                  placeholder="John Doe"
                  value={senderName}
                  onChange={(event) => setSenderName(event.target.value)}
                />
                <span className="text-xs text-muted-foreground block">
                  Emails come from us, but you can change the sender{"'"}s name.
                </span>
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <Label htmlFor="emailSubject">
                  Email Subject:
                  <RequiredStar />
                </Label>
                <Input
                  id="emailSubject"
                  type="text"
                  placeholder="Enter email subject"
                  value={emailSubject}
                  onChange={(event) => setEmailSubject(event.target.value)}
                />
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <Label htmlFor="emailContent">
                  Email Content:
                  <RequiredStar />
                </Label>
                {/* <Input
                id="emailContent"
                type="textarea"
                placeholder="Enter email content"
                value={emailContent}
                onChange={(event) => setEmailContent(event.target.value)}
              /> */}
                <RichTextEditor
                  content={emailContent}
                  onChange={(value: any) => setEmailContent(value)}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex justify-start items-center space-x-2">
                <Switch
                  onCheckedChange={changeEnable}
                  checked={enable}
                  id="enableTwo"
                />
                <Label htmlFor="enableTwo">Enable Email Notification</Label>
              </div>
              <Button type="submit" className="w-40" loading={loading}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      )}
    </ScrollArea>
  );
};

export default SendEmail;
