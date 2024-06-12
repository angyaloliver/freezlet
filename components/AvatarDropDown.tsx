"use client";

import { useRef } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "next-themes";

import { PersonIcon } from "@radix-ui/react-icons";

export const AvatarDropDown = ({
  logOutAction,
}: {
  logOutAction: () => void;
}) => {
  const { theme, setTheme } = useTheme();
  const logOutFormRef = useRef<HTMLFormElement>(null);

  const handleLogoutClick = () => {
    if (logOutFormRef.current) {
      logOutFormRef.current.requestSubmit();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback>
            <PersonIcon />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>my account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            theme === "light" ? setTheme("dark") : setTheme("light")
          }
        >
          toggle mode
        </DropdownMenuItem>
        <form ref={logOutFormRef} action={logOutAction}>
          <DropdownMenuItem onClick={handleLogoutClick}>
            log out
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
