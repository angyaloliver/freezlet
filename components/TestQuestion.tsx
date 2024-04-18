"use client";

import { Tables } from "@/types/supabase";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { shuffle } from "lodash";

export const TestQuestion = ({
  cards,
  completedCards,
  setCompletedCards,
  answers,
  setAnswers,
  useShuffle,
  useFlipped
}: {
  cards: Array<Tables<"cards">>;
  completedCards: Array<Tables<"cards">>;
  setCompletedCards: any;
  answers: Array<string>;
  setAnswers: (arr: Array<string>) => void;
  useShuffle: boolean;
  useFlipped: boolean;
}) => {
  const [currentCard, setCurrentCard] = useState(0);

  const [shuffledCards, setShuffledCards] = useState(useShuffle ? shuffle(cards) : cards);

  const handleSkip = () => {
    setCurrentCard(
      currentCard + 1 >= shuffledCards.length ? 0 : currentCard + 1
    );
  };

  const handleNext = () => {
    const currentAnswer = document.getElementById(
      "answer-input"
    ) as HTMLInputElement;
    setCompletedCards([...completedCards, shuffledCards[currentCard]]);
    setShuffledCards(shuffledCards.filter((_, index) => index !== currentCard));
    setAnswers([...answers, currentAnswer.value.trim()]);
    setCurrentCard(currentCard - 1 > 0 ? currentCard - 1 : 0);
    currentAnswer.value = "";
  };

  return (
    <>
      <p className="mb-4">{useFlipped ? shuffledCards[currentCard].back : shuffledCards[currentCard].front}</p>
      <Input
        id="answer-input"
        autoFocus
        placeholder="answer"
        className="mb-4"
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            handleNext();
          }
        }}
      />
      <div className="flex justify-between">
        <Button variant={"outline"} onClick={handleSkip}>
          skip
        </Button>
        <Button onClick={handleNext}>next</Button>
      </div>
    </>
  );
};
