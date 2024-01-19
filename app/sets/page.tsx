import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Sets() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: sets, error } = await supabase
    .from("sets")
    .select()
    .eq("user_id", user?.id);

  if (error) {
    return <div>error</div>;
  }

  if (!sets) {
    return <div>no sets</div>;
  }

  return <pre>{JSON.stringify(sets, null, 2)}</pre>;
}
