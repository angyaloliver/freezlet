import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { ModeToggle } from "@/components/ui/mode-toggle";

import { MainNav } from "@/components/MainNav";

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
    <div className="w-full flex flex-col gap-20 items-center">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 max-w-screen-2xl items-center px-8">
          <div className="w-[13%]">
            <i>q</i>
          </div>
          <MainNav />
          <div className="flex ml-auto">
            <div className="mr-4">{isSupabaseConnected && <AuthButton />}</div>
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="animate-in flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header />
      </div>
    </div>
  );
}
