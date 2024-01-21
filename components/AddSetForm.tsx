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
  FormDescription,
  FormMessage,
} from "./ui/form";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { createSet } from "@/app/actions";
import { SetSchema } from "../types/zod";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function AddSetForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof SetSchema>>({
    resolver: zodResolver(SetSchema),
    defaultValues: {
      name: "",
      description: "",
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
      router.push(`/sets`);
    }
  };

  // TODO: add useOptimistic, useFormStatus
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>set name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                believe it or not, the name of your set
              </FormDescription>
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
                <Input {...field} />
              </FormControl>
              <FormDescription>what is this set about?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">save</Button>
      </form>
    </Form>
  );
}
