"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const SelfEmail = () => {
  const [enable, setEnable] = useState(false);
  const changeEnable = (checked: boolean) => setEnable(checked);

  return (
    <div>
      {!enable && (
        <div className="flex justify-start items-center space-x-2">
          <Switch
            onCheckedChange={changeEnable}
            checked={enable}
            id="enableOne"
          />
          <Label htmlFor="enableOne">Enable Self Email Notification</Label>
        </div>
      )}
      {enable && (
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground mb-3 block">
            After someone fills out your form on UncleLife, you can send them an
            email. This can be a thank you note or a confirmation of their
            submission. You can also send yourself an email when someone submits
          </span>
        </div>
      )}
    </div>
  );
};

export default SelfEmail;
