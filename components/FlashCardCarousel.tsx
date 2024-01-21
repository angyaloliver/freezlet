"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Tables } from "types/supabase";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from "./ui/carousel";
import { Progress } from "./ui/progress";

const FlashCard = ({ card }: { card: Tables<"cards"> }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Card className="cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <CardContent className="flex aspect-square items-center justify-center p-6">
        <span className="text-4xl font-semibold">
          {isFlipped ? card.back : card.front}
        </span>
      </CardContent>
    </Card>
  );
};

const FlashCardCarousel = ({ cards }: { cards: Array<Tables<"cards">> }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel setApi={setApi} className="w-full mb-6">
        <CarouselContent>
          {cards.map((card, _) => (
            <CarouselItem key={card.id}>
              <div className="p-1">
                <FlashCard card={card} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Progress className="w-full" value={(current / count) * 100} />
    </>
  );
};

export default FlashCardCarousel;
