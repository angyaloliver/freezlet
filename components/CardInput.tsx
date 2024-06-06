"use client";

import { ChangeEvent, useState, KeyboardEvent } from "react";
import { Input } from "./ui/input";
import { Tables } from "@/types/supabase";
import { translate, updateCard } from "@/app/actions";
import { useDebounce } from "@/app/hooks/use-debounce";

export const CardInput = ({
  card,
  index,
  onKeyDown,
  className,
}: {
  card: Tables<"cards">;
  index: number;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>, index: number) => void;
  className?: string;
}) => {
  const [frontValue, setFrontValue] = useState<string>(card.front ?? "");
  const [backValue, setBackValue] = useState<string>(card.back ?? "");
  const [backPlaceholder, setBackPlaceholder] = useState<string>("");

  const onChangeFront = (e: ChangeEvent<HTMLInputElement>) => {
    setFrontValue(e.target.value);
    debouncedRequest();
  };

  const onChangeBack = (e: ChangeEvent<HTMLInputElement>) => {
    setBackValue(e.target.value);
    debouncedRequest();
  };

  const onFirstInputKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && backPlaceholder) {
      setBackValue(backPlaceholder);
      debouncedRequest();
    }
  };

  const onFocus = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!backValue && !backPlaceholder) {
      debouncedRequest();
    }

    moveCursorToEnd(e);
  };

  const onBlur = async () => {
    if (!backValue && backPlaceholder) {
      setBackPlaceholder("");
    }
  };

  const debouncedRequest = useDebounce(async () => {
    await updateCard({ ...card, front: frontValue, back: backValue });
    if (frontValue && !backValue) {
      console.log("translating", frontValue);
      setBackPlaceholder(await translate(frontValue, "pt-BR"));
    }
    console.log(frontValue, backValue);
  });

  return (
    <div className={`flex w-full gap-4 ${className}`}>
      <Input
        type="text"
        value={frontValue}
        onChange={onChangeFront}
        onKeyDown={onFirstInputKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Input
        type="text"
        value={backValue}
        placeholder={backPlaceholder}
        onChange={onChangeBack}
        onKeyDown={(e) => {
          onFirstInputKeyDown(e);
          onKeyDown(e, index + 1);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

const moveCursorToEnd = (e: ChangeEvent<HTMLInputElement>) => {
  const input = e.target;
  const length = input.value.length;
  input.setSelectionRange(length, length);
};
