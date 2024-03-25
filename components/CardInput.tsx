"use client";

import {
  ChangeEvent,
  useState,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Input } from "./ui/input";
import { debounce } from "lodash";
import { Tables } from "@/types/supabase";
import { updateCard } from "@/app/actions";

const useDebounce = (callback: any) => {
  const ref = useRef<() => void>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 1000);
  }, []);

  return debouncedCallback;
};

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

  const onChangeFront = (e: ChangeEvent<HTMLInputElement>) => {
    setFrontValue(e.target.value);
    debouncedRequest();
  };

  const onChangeBack = (e: ChangeEvent<HTMLInputElement>) => {
    setBackValue(e.target.value);
    debouncedRequest();
  };

  const debouncedRequest = useDebounce(async () => {
    await updateCard({ ...card, front: frontValue, back: backValue });
    console.log(frontValue, backValue);
  });

  return (
    <div className={`flex w-full gap-4 ${className}`}>
      <Input type="text" value={frontValue} onChange={onChangeFront} />
      <Input
        type="text"
        value={backValue}
        onChange={onChangeBack}
        onKeyDown={(e) => onKeyDown(e, index + 1)}
      />
    </div>
  );
};
