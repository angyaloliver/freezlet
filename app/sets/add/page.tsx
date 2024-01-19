import { AddSetForm } from "@/components/AddSetForm";
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
      <div className="flex flex-col items-center">
        <AddSetForm />
      </div>
    </div>
  );
}
