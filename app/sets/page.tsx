import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import AddSetDialog from "@/components/AddSetDialog";
import { Tables } from "@/types/supabase";

export default async function Sets() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error: authError } = await supabase.auth.getUser();
  const user = data?.user;

  if (authError) {
    return <div>authError</div>;
  }

  const { data: sets, error } = await supabase
    .from("sets")
    .select("id, name, description")
    .eq("user_id", user?.id)
    .returns<Array<Tables<"sets">>>();

  if (error) {
    return <div>error</div>;
  }

  if (!sets || sets.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-6">no sets</p>
        <AddSetDialog />
      </div>
    );
  }

  return (
    <div className="animate-in w-full pt-28">
      <div className="flex flex-col items-center">
        {sets.map((set) => (
          <Link key={set.id} href={`/sets/${set.id}`}>
            <Card className="flex items-center w-80 h-20 mb-6">
              <CardHeader className="w-full">
                <div className="flex justify-between">
                  <div>
                    <CardTitle>{set.name}</CardTitle>
                    <CardDescription>{set.description}</CardDescription>
                  </div>
                  <Button variant="ghost">
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
        <AddSetDialog />
      </div>
    </div>
  );
}
