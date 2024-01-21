"use server";

import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { SetSchema } from "@/types/zod";

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

  const supabase = createServerActionClient({ cookies });
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

  revalidatePath("/sets");

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

  const supabase = createServerActionClient({ cookies });
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

  revalidatePath("/sets");

  return { message: `deleted set ${result.data.name}` };
}
