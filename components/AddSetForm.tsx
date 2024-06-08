"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";

import { createSet } from "@/app/actions";
import { SetSchema } from "../types/zod";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Label } from "./ui/label";

export const AddSetForm = ({ className }: React.ComponentProps<"form">) => {
  const { toast } = useToast();

  const [isLanguageSet, setIsLanguageSet] = useState(false);

  const form = useForm<z.infer<typeof SetSchema>>({
    resolver: zodResolver(SetSchema),
    defaultValues: {
      name: "",
      description: "",
      language: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof SetSchema>) => {
    const result = SetSchema.safeParse(formData);

    if (result.success) {
      const response = await createSet(result.data);
      toast({
        title: response.message,
        description: "way to go",
      });
    }
  };

  // TODO: add useOptimistic, useFormStatus
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input autoFocus={false} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Input autoFocus={false} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center">
          <Label htmlFor="is-language-set" className="mr-4">
            learning a language?
          </Label>
          <Switch
            id="is-language-set"
            checked={isLanguageSet}
            onCheckedChange={setIsLanguageSet}
          />
        </div>

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className={isLanguageSet ? "visible" : "invisible"}>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PT-BR">🇧🇷 brazilian portuguese</SelectItem>
                  <SelectItem value="HU">🇭🇺 hungarian</SelectItem>
                  <SelectItem value="DE">🇩🇪 german</SelectItem>
                  <SelectItem value="KO">🇰🇷 korean</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          save
        </Button>
      </form>
    </Form>
  );
};
