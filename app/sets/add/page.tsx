import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function CreateSet() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  //   TODO: change to form

  return (
    <div className="animate-in w-full">
      <div className="flex flex-col items-center mb-12">
        <div>
          <Label htmlFor="name">set name</Label>
          <Input name="name" />
        </div>
        <div>
          <Label htmlFor="description">description</Label>
          <Input name="description" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex mb-6">
          <div>
            <Label htmlFor="front">front</Label>
            <Input name="front" />
          </div>
          <div>
            <Label htmlFor="back">back</Label>
            <Input name="back" />
          </div>
        </div>
        <Button>save</Button>
      </div>
    </div>
  );
}
