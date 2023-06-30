import { Card } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const ProfileBar = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  return (
    <Card className="p-3">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={session?.user?.user_metadata?.avatar_url} />
          <AvatarFallback>UL</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="font-bold text-lg">Hello</p>
          <p className="text-gray-500 text-sm">{session?.user?.email}</p>
        </div>
      </div>
      <div className="mt-5">
        <form action="/auth/signout" method="post">
          <Button className="w-full">Logout</Button>
        </form>
      </div>
    </Card>
  );
};

export default ProfileBar;
