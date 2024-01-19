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

export default async function Sets() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: sets, error } = await supabase
    .from("sets")
    .select("id, name, description")
    .eq("user_id", user?.id);

  if (error) {
    return <div>error</div>;
  }

  if (!sets || sets.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-6">no sets</p>
        <Button>create</Button>
      </div>
    );
  }

  return (
    <div className="animate-in w-full">
      <div className="flex flex-col items-center">
        {sets.map((set) => (
          <Link href={`/sets/${set.id}`}>
            <Card key={set.id} className="flex items-center w-80 h-20 mb-6">
              <CardHeader>
                <CardTitle>{set.name}</CardTitle>
                <CardDescription>{set.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
        <Button>
          <Link href="/sets/add">create</Link>
        </Button>
      </div>
    </div>
  );
}
