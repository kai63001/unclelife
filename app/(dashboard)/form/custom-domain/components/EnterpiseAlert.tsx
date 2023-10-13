"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const EnterpriseAlert = () => {
  return (
    <div className="border rounded-md mt-5 p-10">
      <h1 className="text-2xl font-bold border-b pb-5">
        Upgrade to TEAM Plan to Access Custom Domain Features
      </h1>
      <p className="mt-2">
        Unlock the power of custom domain functionality by upgrading to our TEAM
        plan. By doing so, you{"'"}ll not only be able to personalize your
        domain, but also enjoy additional features and benefits designed to help
        your team thrive. Upgrade today, and take your brand{"'"}s online
        presence to the next level.
      </p>
      <Button asChild>
        <Link className="mt-5 py-5 w-full" href={"/pricing"}>Upgrade to TEAM Plan</Link>
      </Button>
    </div>
  );
};

export default EnterpriseAlert;
