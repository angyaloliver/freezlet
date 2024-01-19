"use server";

import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { SetSchema } from "@/lib/types";

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

  revalidatePath("/sets");

  if (error) {
    return {
      message: `failed to create set ${result.data.name}`,
    };
  }

  return { message: `added set ${result.data.name}` };
}
// export async function deleteSet(
//   prevState: {
//     message: string;
//   },
//   formData: FormData
// ) {
//   const schema = z.object({
//     id: z.string().min(1),
//     todo: z.string().min(1),
//   });
//   const data = schema.parse({
//     id: formData.get("id"),
//     todo: formData.get("todo"),
//   });

//   try {
//     await sql`
//       DELETE FROM todos
//       WHERE id = ${data.id};
//     `;

//     revalidatePath("/");
//     return { message: `Deleted set ${data.todo}` };
//   } catch (e) {
//     return { message: "Failed to delete set" };
//   }
// }
