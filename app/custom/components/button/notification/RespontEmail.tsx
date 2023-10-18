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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/app/redux/hook";
import { AlertCircle, FileWarning, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import RichTextEditor from "@/components/RichTextEditor";

const SendEmail = () => {
  const [replyTo, setReplyTo] = useState("");
  const [senderName, setSenderName] = useState("UncleLife");
  const [emailSubject, setEmailSubject] = useState(
    "Your Submission Has Been Recorded!"
  );
  const [emailContent, setEmailContent] = useState("");
  const { layer } = useAppSelector((state) => state.formReducer);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Send email logic here
  };

  return (
    <ScrollArea className="pt-2 -mt-2 max-h-[87vh]">
      <div className="flex flex-col items-center justify-center">
        <span className="text-xs text-muted-foreground mb-3 block">
          After someone fills out your form on UncleLife, you can send them an
          email. This can be a thank you note or a confirmation of their
          submission. You can also send yourself an email when someone submits
        </span>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          {layer.filter((item) => item.type == "email")?.length == 0 && (
            <Alert className="mb-4" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                You need to add email field to your form before using this
                feature.
              </AlertDescription>
            </Alert>
          )}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <Label htmlFor="sendTo">Send To:</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Email Field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {layer?.map((item: any, index: number) => {
                      if (item.type == "email") {
                        return (
                          <SelectItem key={index} value={item.label}>
                            {item.label}
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
              <Label htmlFor="senderName">Sender Name:</Label>
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
              <Label htmlFor="emailSubject">Email Subject:</Label>
              <Input
                id="emailSubject"
                type="text"
                placeholder="Enter email subject"
                value={emailSubject}
                onChange={(event) => setEmailSubject(event.target.value)}
              />
            </div>
            <div className="w-full px-3 mb-6 md:mb-0">
              <Label htmlFor="emailContent">Email Content:</Label>
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
          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </ScrollArea>
  );
};

export default SendEmail;
