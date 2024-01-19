import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const Set = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: cards, error } = await supabase
    .from("cards")
    .select("*")
    .eq("set_id", params.id);

  if (error) {
    return <div>error</div>;
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-6">no cards</p>
      </div>
    );
  }

  return (
    <div className="animate-in w-full">
      <div className="flex flex-col items-center">
        {cards.map((card) => (
          <div key={card.id} className="flex items-center w-80 h-20 mb-6">
            <div>{card.front}</div>
            <div>{card.back}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Set;
