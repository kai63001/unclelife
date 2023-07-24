import { Card } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";

const ProfileBar = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const removeMail = (email: string) => {
    const [name, domain] = email.split("@");
    return name;
  };

  return (
    <Card className="p-3 overflow-hidden">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={session?.user?.user_metadata?.avatar_url} />
          <AvatarFallback>UL</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="font-bold text-lg">Hello</p>
          <p className="text-gray-500 text-sm capitalize">
            {removeMail(session?.user?.email || "UncleLife")}
          </p>
        </div>
      </div>
      <div className="mt-5 flex">
        <Button className="w-full mr-2" variant={"outline"}>
          <Settings className="w-4 h-4" />
        </Button>
        <form action="/auth/signout" method="post">
          <Button className="w-full">
            <LogOut className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ProfileBar;
