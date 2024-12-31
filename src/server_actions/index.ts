"use server";
import { database } from "@/database";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Server action to create a snippet
export async function create_snippet(
  formState: { message: string },
  form_data: FormData
): Promise<{ message: string }> {
  try {
    const title = form_data.get("title")?.toString().trim();
    const code = form_data.get("code")?.toString().trim();

    if (!title || !code) {
      return {
        message: "Please enter valid inputs",
      };
    }

    await database.snippet.create({ data: { title, code } });
  } catch (error: unknown) {
    if (error instanceof Error) return { message: error.message };
    else return { message: "Error creating snippet" };
  }
  revalidatePath("/");
  redirect("/");
}

// Server action to update a snippet
export async function updateSnippet(
  code: string,
  snippetId: number
): Promise<void> {
  try {
    if (!code || !snippetId) {
      throw new Error("Invalid input");
    }

    await database.snippet.update({
      where: { id: snippetId },
      data: { code },
    });
  } catch (error) {
    console.error("Error updating snippet:", error);
    throw error;
  }
  revalidatePath("/");
  revalidatePath(`/snippets/${snippetId}`);
  redirect(`/snippets/${snippetId}`);
}

export async function deleteSnippet(snippetId: number): Promise<void> {
  try {
    if (!snippetId) {
      throw new Error("Invalid input");
    }
    await database.snippet.delete({
      where: { id: snippetId },
    });
  } catch (error) {
    console.error("Error deleting snippet:", error);
    throw error;
  }
  revalidatePath("/");
  redirect("/");
}
