import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-right items-center p-3 text-sm">
          <div className="ml-auto">{isSupabaseConnected && <AuthButton />}</div>
          <ModeToggle />
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header />
      </div>
    </div>
  );
}
