"use client";

import { Tables } from "@/types/supabase";
import { Button } from "./ui/button";
import { useState } from "react";
import { TestQuestion } from "./TestQuestion";
import { TestResults } from "./TestResults";
import { ShuffleIcon, SymbolIcon } from "@radix-ui/react-icons";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const Test = ({ cards }: { cards: Array<Tables<"cards">> }) => {
  const [isTestStarted, setIsTestStarted] = useState(false);

  const [answers, setAnswers] = useState<Array<string>>([]);
  const [completedCards, setCompletedCards] = useState<Tables<"cards">[]>([]);

  const [useShuffle, setUseShuffle] = useState(false);
  const [useFlipped, setUseFlipped] = useState(false);

  if (!isTestStarted) {
    return (
      <div className="flex flex-col justify-center">
        <h1 className="text-center mt-4 mb-6">test yourself</h1>

        <ToggleGroup className="mb-4" type="multiple" variant="outline" onValueChange={(value) => {
          setUseShuffle(value.indexOf("shuffle") > -1);
          setUseFlipped(value.indexOf("flip") > -1);
        }}>
          <ToggleGroupItem
            value="shuffle"
            aria-label="Toggle shuffle"
          >
            <ShuffleIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="flip" aria-label="Toggle flipped card">
            <SymbolIcon />
          </ToggleGroupItem>
        </ToggleGroup>

        <Button
          className="mx-auto"
          onClick={() => {
            setIsTestStarted(true);
          }}
        >
          start
        </Button>
      </div>
    );
  } else
    return (
      <div className="flex justify-center align-center flex-col p-8">
        {completedCards.length != cards.length ? (
          <TestQuestion
            cards={cards}
            completedCards={completedCards}
            setCompletedCards={setCompletedCards}
            answers={answers}
            setAnswers={setAnswers}
            useShuffle={useShuffle}
            useFlipped={useFlipped}
          />
        ) : (
          <TestResults completedCards={completedCards} answers={answers} useFlipped={useFlipped}/>
        )}
      </div>
    );
};

export default Test;
