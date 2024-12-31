import React from "react";
import { database } from "@/database";

import { notFound } from "next/navigation";
import { Snippet } from "@prisma/client";
import SnippetEditForm from "@/components/snippet_edit_form";

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetEditPage({
  params,
}: EditPageProps): Promise<React.JSX.Element> {
  const { id } = await params;

  if (!id) return notFound();

  const snippet: Snippet | null = await database.snippet.findUnique({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <h3 className="text-xl font-bold m-3">Edit Snippet</h3>

      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
