import BackButton from "@/components/BackButton";
import FlashCardCarousel from "@/components/FlashCardCarousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Tables } from "types/supabase";
import { columns } from "./columns";
import DataTable from "@/components/ui/data-table";
import DeleteSetDialog from "@/components/DeleteSetDialog";

const Set = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: set, error: setError } = await supabase
    .from("sets")
    .select("*")
    .eq("id", params.id)
    .returns<Array<Tables<"sets">>>();

  if (setError) {
    return <div>error</div>;
  } else if (!set || set.length !== 1) {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-6">no set</p>
      </div>
    );
  } else if (set[0].user_id !== user?.id) {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-6">not your set</p>
      </div>
    );
  }

  const { data: cards, error: cardsError } = await supabase
    .from("cards")
    .select("*")
    .eq("set_id", params.id);

  if (cardsError || cards === null) {
    return <div>error</div>;
  }

  return (
    <div className="w-full">
      <div className="w-[60%] pt-12 mb-6 mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <BackButton backLink={"/sets"} />
            <h1>{set[0].name}</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {set[0].description}
            </p>
          </div>
          <DeleteSetDialog set={set[0]} />
        </div>
      </div>
      <div className="animate-in flex flex-col items-center">
        <Tabs defaultValue="list" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">list</TabsTrigger>
            <TabsTrigger value="cards">cards</TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <DataTable columns={columns} data={cards} />
          </TabsContent>
          <TabsContent value="cards">
            {cards && cards.length > 0 && <FlashCardCarousel cards={cards} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Set;
