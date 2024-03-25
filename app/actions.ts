"use server";

import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";
import { Card, SetSchema } from "@/types/zod";
import { CardSchema } from "@/types/zod";
import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/types/supabase";

export async function getSet(setId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("sets")
    .select("*")
    .eq("id", setId)
    .returns<Array<Tables<"sets">>>();

  if (error) {
    return {
      set: null,
      message: `failed to get set ${setId}`,
    };
  } else if (!data || data.length !== 1) {
    return {
      set: null,
      message: `set ${setId} not found`,
    };
  } else return { set: data[0], message: null };
}

export async function createSet(newSet: unknown) {
  const result = SetSchema.safeParse(newSet);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage += issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      message: errorMessage,
    };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("sets")
    .insert({ ...result.data, user_id: user?.id });

  if (error) {
    return {
      message: `failed to create set ${result.data.name}`,
    };
  }

  revalidatePath("/sets", "page");

  return { message: `added set ${result.data.name}` };
}

export async function deleteSet(set: unknown) {
  const result = SetSchema.safeParse(set);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage += issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      message: errorMessage,
    };
  }

  if (!result.data.id) {
    return {
      message: "failed to delete set",
    };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("sets")
    .delete()
    .match({ id: result.data.id, user_id: user?.id });

  if (error) {
    return { message: "failed to delete set" };
  }

  revalidatePath("/sets", "page");

  return { message: `deleted set ${result.data.name}` };
}

export async function getCards(setId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("set_id", setId)
    .order("created_at", { ascending: true })
    .returns<Array<Tables<"cards">>>();

  if (error) {
    return {
      cards: null,
      message: "failed to get cards",
    };
  }

  return { cards: data, message: null };
}

export async function createCard(newCard: Tables<"cards">) {
  const result = CardSchema.safeParse(newCard);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage += issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      message: errorMessage,
    };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("cards").insert({ ...result.data });

  if (error) {
    return {
      message: `failed to create card ${error.message}`,
    };
  }

  revalidatePath("/sets/[id]", "page");

  return { message: `added card ${result.data.front}/${result.data.back}` };
}

export async function deleteCard(card: unknown) {
  const result = CardSchema.safeParse(card);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage += issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      message: errorMessage,
    };
  }

  if (!result.data.id) {
    return {
      message: "failed to delete card",
    };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("cards")
    .delete()
    .match({ id: result.data.id });

  if (error) {
    return { message: "failed to delete card" };
  }

  revalidatePath("/sets/[id]", "page");

  return { message: `deleted card ${result.data.front}/${result.data.back}` };
}

export async function updateCard(card: unknown) {
  const result = CardSchema.safeParse(card);

  if (!result.success) {
    let errorMessage = "";

    result.error.issues.forEach((issue) => {
      errorMessage += issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      message: errorMessage,
    };
  }

  if (!result.data.id) {
    return {
      message: "failed to update card",
    };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("cards")
    .update({ ...result.data })
    .eq("id", result.data.id);

  if (error) {
    return { message: "failed to update card" };
  }

  revalidatePath("/sets/[id]", "page");

  return { message: `updated card ${result.data.front}/${result.data.back}` };
}
