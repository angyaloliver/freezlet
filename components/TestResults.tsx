import { Tables } from "@/types/supabase";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export const TestResults = ({
  completedCards,
  answers,
  useFlipped,
}: {
  completedCards: Array<Tables<"cards">>;
  answers: Array<string>;
  useFlipped: boolean;
}) => {
    
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
    });
  }, []);

  return (
    <div>
      <h1 className="text-center mb-8">Test Completed</h1>
      <div className="mt-8">
        <h2 className="text-center mb-4">Results</h2>
        {completedCards.map((card, index) => (
          <div key={card.id} className="mb-2">
            <p>{card.front}</p>
            <p>Your Guess: {answers[index]}</p>
            <p>Correct Answer: {card.back}</p>
            {answers[index] === (useFlipped ? card.front : card.back) ? (
              <p className="text-green-500">Correct!</p>
            ) : (
              <p className="text-red-500">Wrong!</p>
            )}
          </div>
        ))}
        {/* <p>Total Correct Guesses: {correctGuesses}</p> */}
      </div>
    </div>
  );
};
