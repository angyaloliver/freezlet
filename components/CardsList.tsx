"use client";

import { createCard, deleteCard } from "@/app/actions";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { CardInput } from "./CardInput";
import { Button } from "./ui/button";
import { Tables } from "@/types/supabase";
// @ts-ignore
import { useOptimistic, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";

export const CardsList = ({
  cards,
  set,
}: {
  cards: Array<Tables<"cards">>;
  set: Tables<"sets">;
}) => {
  const [_, startTransition] = useTransition();

  const updateFn = (
    state: Array<Tables<"cards">>,
    { action, card }: { action: string; card: Tables<"cards"> }
  ) => {
    console.log("action", action);
    console.log("card", card);
    if (!card) return state;
    switch (action) {
      case "create":
        return [...state, card];
      case "delete":
        return state.filter(({ id }: { id: string }) => id !== card.id);
      case "update":
        return state.map((c) => (c.id === card.id ? card : c));
      default:
        return state;
    }
  };

  const [optimisticCards, setOptimisticCards] = useOptimistic<
    Array<Tables<"cards">>
  >(cards, updateFn);

  const createEmptyCard = () => {
    const card: Tables<"cards"> = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      set_id: set.id,
      front: "",
      back: "",
      image_url: "",
    };
    startTransition(async () => {
      setOptimisticCards({ action: "create", card: card });
      await createCard(card);
    });
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const isLast = index === cards.length - 1;
    if (event.key === "Tab" && isLast) {
      createEmptyCard();
    }
  };

  return (
    <>
      <div className="flex flex-col">
        {optimisticCards.map((card: any, i: number) => {
          return (
            <div key={card.id} className="flex">
              <CardInput
                className="mb-4"
                card={card}
                index={i}
                onKeyDown={(e) => onKeyDown(e, i)}
              />
              <Button
                tabIndex={-1}
                className="ml-2"
                variant={"destructive"}
                onClick={async () => {
                  startTransition(async () => {
                    setOptimisticCards({ action: "delete", card: card });
                    await deleteCard(card);
                  });
                }}
                name="remove"
              >
                <TrashIcon />
              </Button>
            </div>
          );
        })}
      </div>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => createEmptyCard()}
      >
        <PlusIcon />
      </Button>
    </>
  );
};
