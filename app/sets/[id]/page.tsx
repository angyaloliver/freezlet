import BackButton from "@/components/BackButton";
import FlashCardCarousel from "@/components/FlashCardCarousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import DeleteSetDialog from "@/components/DeleteSetDialog";
import { getSet, getCards } from "@/app/actions";
import { CardsList } from "@/components/CardsList";

export const Set = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { set, message: setError } = await getSet(params.id);

  if (setError) {
    return <div>{setError}</div>;
  } else if (set && set.user_id !== user?.id) {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-6">not your set</p>
      </div>
    );
  }

  const { cards, message: cardsError } = await getCards(params.id);

  if (cardsError || cards === null) {
    return <div>{cardsError}</div>;
  }

  return (
    <>
      {set && (
        <div className="w-full">
          <div className="w-[60%] pt-12 mb-6 mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <BackButton backLink={"/sets"} />
                <h1>{set.name}</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {set.description}
                </p>
              </div>
              <DeleteSetDialog set={set} />
            </div>
          </div>
          <div className="animate-in flex flex-col items-center">
            <Tabs defaultValue="list" className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="list">list</TabsTrigger>
                <TabsTrigger value="cards">cards</TabsTrigger>
              </TabsList>
              <TabsContent value="list">
                <CardsList cards={cards} set={set} />
              </TabsContent>
              <TabsContent value="cards">
                {cards && cards.length > 0 && (
                  <FlashCardCarousel cards={cards} />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default Set;
